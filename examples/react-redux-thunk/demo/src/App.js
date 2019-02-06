import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { makeEntityReducer } from 'redux-entity-manager';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import { ConnectedLayout } from './components/Layout';

const rootReducer = combineReducers({
    entities: combineReducers({
        user: makeEntityReducer({ entityName: 'user', primaryKey: 'id' }),
        post: makeEntityReducer({ entityName: 'post', primaryKey: 'id' }),
    }),
});

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
const store = createStore(rootReducer, compose(applyMiddleware(thunk), devTools && devTools()));

export const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <ConnectedLayout />
        </BrowserRouter>
    </Provider>
);
