// Initializes the client-side React app.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

// import './stylesheet.css';

import store from './store'
import App from './components/App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);