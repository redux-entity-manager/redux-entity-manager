import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    Button,
    Chip,
    Toolbar,
} from '@material-ui/core';

import { readStatusSelector, Status } from 'redux-entity-manager';

import { entitiesSelector, makeReadThunk } from '../utils';

import { ConnectedForm } from './form/Form';
import { Grid } from './grid/Grid';

const makeUserSlug = name => {
    return name
        ? name.split(' ').map(s => s.toLowerCase()).join('-')
        : '';
};

const makeUserAvatar = name => {
    return name
        ? name.split(' ').map(s => s.slice(0, 1)).join('')
        : '';
};

const postGridColumns = [
    {
        key: 'id',
        label: 'ID',
    },
    {
        key: 'title',
        label: 'Title',
    },
    {
        key: 'userId',
        label: 'User',
        entityName: 'user',
        query: null,
        labelKey: 'name',
        valueKey: 'id',
    },
];

const postFormFields = [
    {
        key: 'id',
        label: 'ID',
        readonly: true,
    },
    {
        key: 'title',
        label: 'Title',
    },
    {
        key: 'userId',
        label: 'User',
        entityName: 'user',
        query: null,
        labelKey: 'name',
    },
];

const userGridColumns = [
    {
        key: 'id',
        label: 'ID',
        readonly: true,
    },
    {
        key: 'name',
        label: 'Name',
    },
];

const userFormFields = [
    {
        key: 'id',
        label: 'ID',
    },
    {
        key: 'name',
        label: 'Name',
    },
];

const navigateToUser = props => user => {
    const url = user
        ? `/users/${user.id}`
        : '/users/create';
    props.history.push(url);
};

const navigateToPost = props => post => {
    const url = post
        ? `/posts/${post.id}`
        : '/posts/create';
    props.history.push(url);
};

class Layout extends Component {

    componentDidMount() {
        this.props.readUsers();
    }

    render() {
        const { users, status } = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/users">
                            All Users
                        </Button>
                        <Button color="inherit" component={Link} to="/posts">
                            All Posts
                        </Button>
                    </Toolbar>
                </AppBar>
                <nav style={{ width: 1200, margin: '32px auto' }}>
                    <span style={{ display: 'inline-block', marginRight: '8px' }}>First three users:</span>
                    {users.slice(0, 3).map((user, i) => {
                        const { name } = user;
                        return <Chip
                            key={i}
                            clickable
                            avatar={<Avatar>{makeUserAvatar(name)}</Avatar>}
                            label={name}
                            component={Link}
                            to={`/posts/${makeUserSlug(name)}`}
                            style={{ marginRight: '8px' }}
                        />
                    })}
                </nav>
                <main>
                    {status === Status.SUCCESS && <Switch>
                        <Route
                            path="/posts"
                            exact={true}
                            render={props => <Grid
                                {...props}
                                entityName="post"
                                query={null}
                                columns={postGridColumns}
                                onDoubleClick={navigateToPost(props)}
                                onCreate={navigateToPost(props)}
                                onEdit={navigateToPost(props)}
                            />}
                        />
                        {users.map((user, i) => {
                            return <Route
                                key={i}
                                path={`/posts/${makeUserSlug(user.name)}`}
                                exact={true}
                                render={props => <Grid
                                    {...props}
                                    entityName="post"
                                    query={{ userId: user.id }}
                                    columns={postGridColumns}
                                    onDoubleClick={navigateToPost(props)}
                                    onCreate={navigateToPost(props)}
                                    onEdit={navigateToPost(props)}
                                />}
                            />;
                        })}
                        <Route
                            path="/posts/create"
                            exact={true}
                            render={() => <ConnectedForm entityName="post" query={null} fields={postFormFields} />}
                        />
                        <Route
                            path="/posts/:id"
                            exact={true}
                            render={({ match }) => <ConnectedForm entityName="post" query={{ id: match.params.id }} fields={postFormFields} />}
                        />
                        <Route
                            path="/users"
                            exact={true}
                            render={props => <Grid
                                {...props}
                                entityName="user"
                                query={null}
                                columns={userGridColumns}
                                onDoubleClick={navigateToUser(props)}
                                onCreate={navigateToUser(props)}
                                onEdit={navigateToUser(props)}
                            />}
                        />
                        <Route
                            path="/users/create"
                            exact={true}
                            render={() => <ConnectedForm entityName="user" query={null} fields={userFormFields} />}
                        />
                        <Route
                            path="/users/:id"
                            exact={true}
                            render={({ match }) => <ConnectedForm entityName="user" query={{ id: match.params.id }} fields={userFormFields} />}
                        />
                        <Redirect to="/posts" />
                    </Switch>}
                </main>
            </div>
        );
    }
}

const makeMapState = () => state => ({
    users: entitiesSelector(state, { entityName: 'user', query: null }),
    status: readStatusSelector(state, { entityName: 'user', query: null }),
});

const makeMapDispatch = () => dispatch => ({
    readUsers: () => dispatch(makeReadThunk('user', null)),
});

export const ConnectedLayout = withRouter(connect(makeMapState, makeMapDispatch)(Layout));
