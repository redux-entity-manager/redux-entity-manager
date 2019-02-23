import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Toolbar,
    Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { readStatusSelector, Status, configSelector } from 'redux-entity-manager';

import { entitiesSelector, makeReadThunk, totalSelector } from '../../utils';

import { ConnectedRenderer } from './Renderer';

class Page extends Component {

    componentDidMount() {
        this.props.read();
    }

    componentDidUpdate(props) {
        if (props.page !== this.props.page || props.entityName !== this.props.entityName || JSON.stringify(props.query) !== JSON.stringify(this.props.query)) {
            this.props.read();
        }
    }

    render() {
        return this.props.status === Status.PENDING
            ? 'Loading...'
            : this.renderGrid();
    }

    renderGrid() {
        const { columns, items, selectedId, total, limit, onSelect, config } = this.props;
        const nPages = Math.ceil(total / limit);
        return (
            <div>
                <Toolbar style={{ padding: 0 }}>
                    <Tooltip title="Add">
                        <div>
                            <IconButton aria-label="Add" onClick={() => this.props.onCreate()}>
                                <AddIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                    <Tooltip title="Edit Selected">
                        <div>
                            <IconButton aria-label="Edit Selected" onClick={() => this.props.onEdit()}>
                                <EditIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                    <Tooltip title="Previous Page">
                        <div>
                            <IconButton aria-label="Previous Page" disabled={this.props.page === 1} onClick={() => this.props.onPrevious()}>
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                    <span style={{ display: 'inline-block', margin: '0 20px' }}>
                        Page {this.props.page} of {nPages}
                    </span>
                    <Tooltip title="Next Page">
                        <div>
                            <IconButton aria-label="Next Page" disabled={this.props.page === nPages} onClick={() => this.props.onNext()}>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                </Toolbar>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, i) => <TableCell key={i}>{column.label}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, i) => (
                            <TableRow
                                key={i}
                                hover
                                onClick={() => onSelect(item[config.primaryKey])}
                                onDoubleClick={() => this.props.onDoubleClick(item)}
                                selected={selectedId === item[config.primaryKey]}
                            >
                                {columns.map((column, key) => (
                                    <TableCell key={key}>
                                        {column.entityName
                                            ? <ConnectedRenderer
                                                entityName={column.entityName}
                                                query={column.query}
                                                labelKey={column.labelKey}
                                                valueKey={column.valueKey}
                                                value={item[column.key]}
                                            />
                                            : item[column.key]
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const makeMapState = () => (state, { entityName, query }) => ({
    items: entitiesSelector(state, { entityName, query }),
    status: readStatusSelector(state, { entityName, query }),
    total: totalSelector(state, { entityName, query }),
    config: configSelector(state, { entityName }),
});

const makeMapDispatch = () => (dispatch, { entityName, query }) => ({
    read: () => dispatch(makeReadThunk(entityName, query)),
});

export const ConnectedPage = connect(makeMapState, makeMapDispatch)(Page);
