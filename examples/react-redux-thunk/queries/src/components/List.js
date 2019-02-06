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
            : <ul>{this.props.items.map(item => <li key={item.id}>{item[this.props.label]}</li>)}</ul>;
    }
}

const makeEntitiesSelector = () => createSelector(
    indexSelector,
    itemsSelector,
    indexItemsCombiner,
);

const makeMapState = () => (state, props) => {
    const entitiesSelector = makeEntitiesSelector();
    const { entityName, query } = props;
    return {
        items: entitiesSelector(state, { entityName, query }),
        status: readStatusSelector(state, { entityName, query }),
    };
};

const makeUrl = (entityName, query) => {
    const url = process.env.REACT_APP_LOCAL
        ? '/'
        : 'https://jsonplaceholder.typicode.com/';
    const baseUrl = `${url}${entityName}s`;
    const queryString = query
        ? Object.keys(query).map(k => `${k}=${query[k]}`).join('&')
        : null;
    return queryString
        ? `${baseUrl}?${queryString}`
        : baseUrl;
};

const makeReadThunk = (entityName, query) => dispatch => {
    const url = makeUrl(entityName, query);
    dispatch(makeReadRequestAction(entityName, query));
    fetch(url)
        .then(response => response.json())
        .then(items => {
            dispatch(makeReadSuccessAction(entityName, query, items));
        });
};

const makeMapDispatch = () => (dispatch, props) => {
    const { entityName, query } = props;
    return {
        read: () => dispatch(makeReadThunk(entityName, query)),
    };
};

export const ConnectedList = connect(makeMapState, makeMapDispatch)(List);
