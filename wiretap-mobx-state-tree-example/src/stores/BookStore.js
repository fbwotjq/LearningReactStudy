import { types, getParent, process } from "mobx-state-tree";

export const Book = types.model("Book", {
  id: types.identifier(),
  name: types.string,
  author: types.string,
  price: types.number,
  isAvailable: true
});

export const BookStore = types
  .model("BookStore", {
    isLoading: true,
    books: types.map(Book)
  })
  .views(self => ({
    get shop() {
      return getParent(self);
    },
    get sortedAvailableBooks() {
      return sortBooks(self.books.values());
    }
  }))
  .actions(self => {
    function markLoading(loading) {
      self.isLoading = loading;
    }

    function updateBooks(json) {
      if (!json) return;
      self.books.values().forEach(book => (book.isAvailable = false));
      json.forEach(bookJson => {
        self.books.put(bookJson);
        self.books.get(bookJson.id).isAvailable = true;
      });
    }

    const loadBooks = process(function* loadBooks() {
      try {
        const json = yield self.shop.fetch("/books.json");
        updateBooks(json);
        markLoading(false);
      } catch (err) {
        console.error("Failed to load books ", err);
      }
    });

    function alerlf() {
      alert(1)
    }

    function print() {
        self.books.forEach(it => {
          console.log(it)
        })
        //alert(1)
    }

    function temp() {
        alert(self.books.map(it => it.id).join(','))
    }

    return {
      updateBooks,
      loadBooks,
        alerlf,
        print,
        temp
    };
  });

function sortBooks(books) {
  return books
    .filter(b => b.isAvailable)
    .sort((a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1));
}
