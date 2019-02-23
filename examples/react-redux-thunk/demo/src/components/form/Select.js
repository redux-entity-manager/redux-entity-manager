import React, { Component } from 'react';
import { connect } from 'react-redux';
import MaterialSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { readStatusSelector, Status, configSelector } from 'redux-entity-manager';

import { entitiesSelector, makeReadThunk } from '../../utils';

class Select extends Component {

    componentDidMount() {
        this.props.read();
    }

    render() {
        const { entityName, query, items, label, status, read, config, labelKey, ...rest } = this.props;
        return this.props.status === Status.PENDING
            ? 'Loading...'
            : (
                <FormControl style={{ width: '100%' }}>
                    <InputLabel>{label}</InputLabel>
                    <MaterialSelect {...rest}>
                        {this.props.items.map((item, i) => <option key={i} value={item[config.primaryKey]}>{item[labelKey]}</option>)}
                    </MaterialSelect>
                </FormControl>
            );
    }
}

const makeMapState = () => (state, { entityName, query }) => ({
    items: entitiesSelector(state, { entityName, query }),
    status: readStatusSelector(state, { entityName, query }),
    config: configSelector(state, { entityName }),
});

const makeMapDispatch = () => (dispatch, { entityName, query }) => ({
    read: () => dispatch(makeReadThunk(entityName, query, true)),
});

export const ConnectedSelect = connect(makeMapState, makeMapDispatch)(Select);
