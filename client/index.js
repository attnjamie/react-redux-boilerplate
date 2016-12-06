import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory } from 'react-router';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../shared/store';
import AppRouter from '../shared/routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
  document.getElementById('app')
);
