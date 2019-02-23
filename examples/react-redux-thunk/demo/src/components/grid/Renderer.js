import React, { Component } from 'react';
import { connect } from 'react-redux';

import { readStatusSelector, Status } from 'redux-entity-manager';

import { entitiesSelector, makeReadThunk } from '../../utils';

class Renderer extends Component {

    componentDidMount() {
        this.props.read();
    }

    render() {
        const { items, valueKey, labelKey, value, status } = this.props;
        return status === Status.PENDING
            ? 'Loading...'
            : <span>{items && items.find(item => item[valueKey] === value)[labelKey]}</span>;
    }
}

const makeMapState = () => (state, { entityName, query }) => ({
    items: entitiesSelector(state, { entityName, query }),
    status: readStatusSelector(state, { entityName, query }),
});

const makeMapDispatch = () => (dispatch, { entityName, query }) => ({
    read: () => dispatch(makeReadThunk(entityName, query, true)),
});

export const ConnectedRenderer = connect(makeMapState, makeMapDispatch)(Renderer);
