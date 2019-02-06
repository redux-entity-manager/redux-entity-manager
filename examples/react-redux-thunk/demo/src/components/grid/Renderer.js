import React, { Component } from 'react';
import { connect } from 'react-redux';

import { readStatusSelector, Status } from 'redux-entity-manager';

import { entitiesSelector, makeReadThunk } from '../../utils';

class Renderer extends Component {

    componentDidMount() {
        this.props.read();
    }

    render() {
        return this.props.status === Status.PENDING
            ? 'Loading...'
            : <span>{this.props.items[0] && this.props.items[0][this.props.labelKey]}</span>;
    }
}

const makeMapState = () => (state, { entityName, query }) => ({
    items: entitiesSelector(state, { entityName, query }),
    status: readStatusSelector(state, { entityName, query }),
});

const makeMapDispatch = () => (dispatch, { entityName, query }) => ({
    read: () => dispatch(makeReadThunk(entityName, query)),
});

export const ConnectedRenderer = connect(makeMapState, makeMapDispatch)(Renderer);
