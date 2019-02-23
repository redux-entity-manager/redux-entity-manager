import React, { Component } from 'react';
import { Card, CardContent } from '@material-ui/core';

import { ConnectedPage } from './Page';

export class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 10,
            selectedId: null,
        };
    }

    componentWillMount() {
        const { hash } = this.props.location;
        const [page, selectedId] = hash.substr(1).split(',').map(Number);
        if (page) {
            this.setState({ page }, () => this.updateHash());
        }
        if (selectedId) {
            this.setState({ selectedId }, () => this.updateHash());
        }
    }

    render() {
        return (
            <Card style={{ margin: 32 }}>
                <CardContent>
                    <ConnectedPage
                        {...this.props}
                        query={{ ...this.props.query, _page: this.state.page, _limit: this.state.limit }}
                        limit={this.state.limit}
                        page={this.state.page}
                        selectedId={this.state.selectedId}
                        onCreate={() => this.onCreate()}
                        onEdit={() => this.onEdit()}
                        onPrevious={() => this.onPrevious()}
                        onNext={() => this.onNext()}
                        onSelect={selectedId => this.onSelect(selectedId)}
                    />
                </CardContent>
            </Card>
        );

    }

    onPrevious() {
        this.setState({ page: this.state.page - 1 }, () => this.updateHash());
    }

    onNext() {
        this.setState({ page: this.state.page + 1 }, () => this.updateHash());
    }

    onSelect(selectedId) {
        this.setState({ selectedId }, () => this.updateHash());
    }

    updateHash() {
        const { page, selectedId } = this.state;
        const hash = [page, selectedId].filter(Boolean).join(',');
        this.props.history.replace({ hash });
    }

    get hasNoSelection() {
        return !this.state.selectedId;
    }

    onCreate() {
        this.props.onCreate();
    }

    onEdit() {
        const { selectedId } = this.state;
        if (selectedId) {
            this.props.onEdit(selectedId);
        }
    }
}
