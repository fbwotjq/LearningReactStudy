import React, { Component } from 'react';
import MyDummyComponent from "./MyDummyComponent";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }

    clear() {
        this.myRef.current.clear()
    }

  render() {
    return (
      <div className="App">
        <MyDummyComponent ref={this.myRef}/>
        <button onClick={event => {this.clear()}}>clear input</button>
      </div>
    );
  }
}
