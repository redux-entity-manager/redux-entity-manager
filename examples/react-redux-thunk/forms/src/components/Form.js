import { Formik } from 'formik';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
    indexItemsCombiner,
    itemsSelector,
    indexSelector,
    makeReadRequestAction,
    makeReadSuccessAction,
    makeUpdateRequestAction,
    makeUpdateSuccessAction,
    updateStatusSelector,
    Status,
    readStatusSelector,
} from 'redux-entity-manager';

class Form extends Component {

    componentDidMount() {
        this.props.read();
    }

    render() {
        const { items, updateStatus, readStatus } = this.props;
        const disabled = updateStatus === Status.PENDING || readStatus === Status.PENDING;
        return (
            <Formik
                initialValues={items && items[0] ? items[0] : { id: '', name: '' }}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting }) => {
                    this.props.update(values);
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <fieldset disabled={disabled}>
                            <div>
                                <label>
                                    <div>
                                        ID
                                    </div>
                                    <input
                                        type="text"
                                        name="id"
                                        readOnly={true}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.id}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <div>
                                        Name
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                </label>
                            </div>
                            <button disabled={disabled} type="submit">
                                Submit
                            </button>
                        </fieldset>
                    </form>
                )}
            </Formik>
        );
    }
}

const entitiesSelector = createSelector(
    indexSelector,
    itemsSelector,
    indexItemsCombiner,
);

const mapState = state => ({
    items: entitiesSelector(state, { entityName: 'user', query: { id: 1 } }),
    readStatus: readStatusSelector(state, { entityName: 'user', query: { id: 1 } }),
    updateStatus: updateStatusSelector(state, { entityName: 'user', query: { id: 1 } }),
});

const makeUrl = () => {
    return process.env.REACT_APP_LOCAL
        ? '/users/1'
        : 'https://jsonplaceholder.typicode.com/users/1';
}

const readThunk = dispatch => {
    const url = makeUrl();
    dispatch(makeReadRequestAction('user', { id: 1 }));
    fetch(url)
        .then(response => response.json())
        .then(item => {
            dispatch(makeReadSuccessAction('user', { id: 1 }, [ item ]));
        });
};

const makeUpdateThunk = item => dispatch => {
    const url = makeUrl();
    dispatch(makeUpdateRequestAction('user', { id: 1 }, [ item ]));
    fetch(url, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })
    .then(response => response.json())
    .then(() => {
        dispatch(makeUpdateSuccessAction('user', { id: 1 }, [ item ]));
    });
};

const mapDispatch = dispatch => ({
    read: () => dispatch(readThunk),
    update: item => dispatch(makeUpdateThunk(item)),
});

export const ConnectedForm = connect(mapState, mapDispatch)(Form);
