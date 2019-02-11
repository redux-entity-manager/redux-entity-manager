import { Formik } from 'formik';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    Typography,
} from '@material-ui/core';

import { updateStatusSelector, Status, readStatusSelector } from 'redux-entity-manager';

import { entitiesSelector, makeReadThunk, makeUpdateThunk, makeCreateThunk } from '../../utils';

import { ConnectedSelect } from './Select';

class Form extends Component {

    componentDidMount() {
        const { query, read } = this.props;
        if (query && query.id) {
            read();
        }
    }

    render() {
        const { fields, items, updateStatus, readStatus, query } = this.props;
        const disabled = updateStatus === Status.PENDING || readStatus === Status.PENDING;
        const defaultValues = fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {});
        return (
            <div>
                {!process.env.REACT_APP_LOCAL && <Card style={{ width: 480, margin: '36px auto' }}>
                    <CardContent>
                        <Typography variant="body2" gutterBottom>
                            This demo uses fake server.
                            Requests to create or update an entity won't be processed.
                            To use real server clone and run locally:
                            <code style={{ display: 'block' }}>
                                git clone ...<br/>
                                yarn install<br/>
                                yarn start:local
                            </code>
                            or
                            <code style={{ display: 'block' }}>
                                git clone ...<br/>
                                npm install<br/>
                                npm run start:local
                            </code>
                        </Typography>
                    </CardContent>
                </Card>}
                <Card style={{ width: 480, margin: '36px auto' }}>
                    <Formik
                        initialValues={items && items[0] ? { ...defaultValues, ...items[0] } : defaultValues}
                        enableReinitialize={true}
                        onSubmit={(values, { setSubmitting }) => {
                            if (query && query.id) {
                                this.props.update(values);
                            } else {
                                this.props.create(values);
                            }
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
                                <fieldset style={{ border: 'none' }} disabled={disabled}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h4" component="h1">
                                            {query && query.id ? 'Edit' : 'Create'}
                                        </Typography>
                                        {fields.map((field, i) => {
                                            return (
                                                <div key={i} style={{ marginBottom: 16 }}>
                                                    {field.entityName
                                                        ? <ConnectedSelect
                                                            label={field.label}
                                                            entityName={field.entityName}
                                                            query={field.query}
                                                            name={field.key}
                                                            readOnly={field.readonly}
                                                            labelKey={field.labelKey}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values[field.key]}
                                                        />
                                                        : <TextField
                                                            label={field.label}
                                                            name={field.key}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values[field.key]}
                                                            inputProps={{
                                                                readOnly: field.readonly,
                                                            }}
                                                            style={{ width: '100%' }}
                                                        />
                                                    }
                                                </div>
                                            );
                                        })}
                                    </CardContent>
                                    <CardActions>
                                        <Button disabled={disabled} type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </CardActions>
                                </fieldset>
                            </form>
                        )}
                    </Formik>
                </Card>
            </div>
        );
    }
}

const makeMapState = () => (state, { entityName, query }) => ({
    items: entitiesSelector(state, { entityName, query }),
    readStatus: readStatusSelector(state, { entityName, query }),
    updateStatus: updateStatusSelector(state, { entityName, query }),
});

const makeMapDispatch = () => (dispatch, { entityName, query }) => ({
    read: () => dispatch(makeReadThunk(entityName, query)),
    create: item => dispatch(makeCreateThunk(entityName, query, item)),
    update: item => dispatch(makeUpdateThunk(entityName, query, item)),
});

export const ConnectedForm = connect(makeMapState, makeMapDispatch)(Form);
