import React, { Component } from 'react';
import MyInputComponent from './MyInputComponent'

export default class MyDummyComponent extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }

    clear() {
        this.myRef.current.clear()
    }

    render() {
        return (<div><MyInputComponent ref={this.myRef} /></div>)
    }

}
