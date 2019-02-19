function flow(gen) {
    let args = [].slice.call(arguments, 1), it;
    it = gen.apply(this, args)
    return Promise.resolve().then(function handleNext(value) {
        let next = it.next(value)
        return (function hdndleResult(next) {

            console.log('IN FLOW')
            console.log(next)

            if(next.done) {
                return next.value;
            } else {
                return Promise.resolve(next.value).then(handleNext, function HandleErr(err) {
                    console.log("ERROR LOG START")
                    console.log(err)
                    return Promise.resolve(it.throw(err)).then(hdndleResult)
                })
            }
        })(next);
    });
}

function *main() {
    yield new Promise((resolve, reject) => {
        console.log(`Promise1 start`)
        resolve({key: "key1", value: "value1"})
        console.log(`Promise1 end`)
    })
    yield new Promise((resolve, reject) => {
        console.log(`Promise2 start`)
        resolve({key: "key2", value: "value2"})
        console.log(`Promise2 end`)
    })

    // 해당 라인을 지우거나 해서 확인 바람
    yield new Promise((resolve, reject) => {
        console.log(`Promise2-1 error start`)
        reject({key: "key3", value: "value3"})
        console.log(`Promise2-1 error end`)
    })

    yield new Promise((resolve, reject) => {
        console.log(`Promise3 start`)
        resolve({key: "key3", value: "value3"})
        console.log(`Promise3 end`)
    })
}

flow(main)
