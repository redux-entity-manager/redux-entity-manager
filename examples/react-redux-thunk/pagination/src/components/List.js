import React, { Component } from 'react';

import { ConnectedPage } from './Page';

export class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        };
    }

    render() {
        return <ConnectedPage
            {...this.props}
            page={this.state.page}
            onPrevious={() => this.onPrevious()}
            onNext={() => this.onNext()}
        />;
    }

    onPrevious() {
        this.setState({
            ...this.state,
            page: this.state.page - 1,
        })
    }

    onNext() {
        this.setState({
            ...this.state,
            page: this.state.page + 1,
        })
    }
}
