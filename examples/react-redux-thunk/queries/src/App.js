import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { makeEntityReducer } from 'redux-entity-manager';
import thunk from 'redux-thunk';

import './App.css';

import { ConnectedList } from './components/List';

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
        <ConnectedList entityName="user" query={{ _page: 1 }} label="name" />
        <ConnectedList entityName="post" query={{ _page: 2 }} label="title" />
    </Provider>
);
