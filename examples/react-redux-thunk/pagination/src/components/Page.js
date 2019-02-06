import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    indexItemsCombiner,
    indexSelector,
    itemsSelector,
    makeReadRequestAction,
    makeReadSuccessAction,
    makeShouldReadCombiner,
    metadataSelector,
    readStatusSelector,
    readTimestampsSelector,
    Status,
} from 'redux-entity-manager';
import { createSelector } from 'reselect';

class Page extends Component {

    componentDidMount() {
        this.props.read();
    }

    componentDidUpdate(props) {
        if (props.page !== this.props.page) {
            this.props.read();
        }
    }

    render() {
        const nPages = Math.ceil(this.props.total / this.props.limit);
        return (
            <div>
                <div>
                    <button disabled={this.props.page === 1} onClick={() => this.props.onPrevious()}>Previous</button>
                    <span style={{ display: 'inline-block', margin: '0 20px' }}>
                        Page {this.props.page} of {nPages}
                    </span>
                    <button disabled={this.props.page === nPages} onClick={() => this.props.onNext()}>Next</button>
                </div>
                <div>
                    {this.renderList()}
                </div>
            </div>
        );

    }

    renderList() {
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

const shouldReadSelector = createSelector(
    readStatusSelector,
    readTimestampsSelector,
    makeShouldReadCombiner(5000),
);

const makeTotalSelector = () => createSelector(
    metadataSelector,
    metadata => metadata ? metadata.total : null,
);

const makeMapState = () => (state, props) => {
    const entitiesSelector = makeEntitiesSelector();
    const totalSelector = makeTotalSelector();
    const { entityName, page } = props;
    const selectorProps = { entityName, query: { _page: page } };
    return {
        items: entitiesSelector(state, selectorProps),
        status: readStatusSelector(state, selectorProps),
        total: totalSelector(state, selectorProps),
    };
};

const makeUrl = (entityName, page) => {
    const url = process.env.REACT_APP_LOCAL
        ? '/'
        : 'https://jsonplaceholder.typicode.com/';
    return `${url}${entityName}s?_page=${page}`;
};

const makeReadThunk = (entityName, page) => (dispatch, getState) => {
    const url = makeUrl(entityName, page);
    const state = getState();
    const shouldRead = shouldReadSelector(state, { entityName, query: { _page: page } });
    if (shouldRead) {
        dispatch(makeReadRequestAction(entityName, { _page: page }));
        fetch(url)
            .then(response => {
                return response.json().then(body => ({
                    headers: response.headers,
                    body,
                }));
            })
            .then(response => {
                const items = response.body;
                const metadata = {
                    total: response.headers.get('x-total-count'),
                };
                dispatch(makeReadSuccessAction(entityName, { _page: page }, items, metadata));
            });
    }
};

const makeMapDispatch = () => (dispatch, props) => {
    const { entityName, page } = props;
    return {
        read: () => dispatch(makeReadThunk(entityName, page)),
    };
};

export const ConnectedPage = connect(makeMapState, makeMapDispatch)(Page);
