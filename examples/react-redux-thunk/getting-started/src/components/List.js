import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    indexItemsCombiner,
    itemsSelector,
    indexSelector,
    makeReadRequestAction,
    makeReadSuccessAction,
    readStatusSelector,
    Status,
} from 'redux-entity-manager';
import { createSelector } from 'reselect';

class List extends Component {

    componentDidMount() {
        this.props.read();
    }

    render() {
        return this.props.status === Status.PENDING
            ? 'Loading...'
            : <ul>{this.props.items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
    }
}

const entitiesSelector = createSelector(
    indexSelector,
    itemsSelector,
    indexItemsCombiner,
);

const mapState = state => ({
    items: entitiesSelector(state, { entityName: 'user', query: null }),
    status: readStatusSelector(state, { entityName: 'user', query: null }),
});

const readThunk = dispatch => {
    const url = process.env.REACT_APP_LOCAL
        ? '/users'
        : 'https://jsonplaceholder.typicode.com/users';
    dispatch(makeReadRequestAction('user', null));
    fetch(url)
        .then(response => response.json())
        .then(items => {
            dispatch(makeReadSuccessAction('user', null, items));
        });
};

const mapDispatch = dispatch => ({
    read: () => dispatch(readThunk),
});

export const ConnectedList = connect(mapState, mapDispatch)(List);
