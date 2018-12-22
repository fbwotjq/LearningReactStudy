import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import App from './App';
import CounterStore from './stores/counter';

const counter = new CounterStore();

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Provider counter={counter}>
        <App />
    </Provider>,
    document.getElementById('root')
);
