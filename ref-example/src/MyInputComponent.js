import React, { Component } from 'react';

export default class MyInputComponent extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }

    clear() {
        this.myRef.current.value = ''
    }

    render() {
        return <input type="text" ref={this.myRef} />;
    }

}
