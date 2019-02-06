# Getting Started

[Online Demo](https://codesandbox.io/embed/github/redux-entity-manager/redux-entity-manager/tree/master/examples/react-redux-thunk/getting-started)

Alternatively, you can run this example locally:

```
yarn start:local
```

or

```
npm run start:local
```


## Goals

In this tutorial we'll write a simple app that renders a list of users.
Until the list of users is loaded, the app will say 'Loading...'.

We'll use `redux`, `react-redux`, `redux-thunk` and `reselect` packages.


## Reducer Configuration

Your root reducer *must* contain a slice called `entities`.
In this app we have only one domain entity - `user`, for which we'll create a reducer using a `makeEntityReducer` function.
Both `entityName` and `id` are mandatory.

```js
import { combineReducers } from 'redux';
import { makeEntityReducer } from 'redux-entity-manager';

const rootReducer = combineReducers({
    entities: combineReducers({
        user: makeEntityReducer({ entityName: 'user', primaryKey: 'id' }),
    }),
});
```


## Selectors

We will need two selectors:
- for the list of users
- for whether the list has been loaded or not

As for the second point, *Redux Entity Manager* provides us with `readStatusSelector`.

For the list of users, however, we'll need to write the selector ourselves.
This is because it is a composite selector, and *Redux Entity Manager* doesn't make assumptions about selector libraries we're using. In this example it happens to be `reselect`, but it can be anything else.

```js
import { createSelector } from 'reselect';
import {
    indexItemsCombiner,
    itemsSelector,
    indexSelector,
} from 'redux-entity-manager';

const entitiesSelector = createSelector(
    indexSelector,
    itemsSelector,
    indexItemsCombiner,
);
```


## Mapping State to Props

This is pretty straightforward. We're using our selectors to pass `items` and `status` as props to the component.
Since we need all users, we got `query: null`.
If we had to fetch only the first user we would have `query: { id: 1 }`.

Note that it is *your* responsibility to process `query` when you're making requests to the server.
For example, `query: null` might map to `GET /users` and `query: { id: 1 }` - to `GET /users/1`.

```js
import { readStatusSelector } from 'redux-entity-manager';

const mapState = state => ({
    items: entitiesSelector(state, { entityName: 'user', query: null }),
    status: readStatusSelector(state, { entityName: 'user', query: null }),
});
```


## Mapping Dispatch to Props

Note that we're dispatching two actions here: `makeReadRequestAction` and `makeReadSuccessAction`.

*Redux Entity Manager* provides us with 12 action creators:

|        | Request                   | Success                   | Failure                   |
| -----: | :-----------------------: | :-----------------------: | :-----------------------: |
| Create | `makeCreateRequestAction` | `makeCreateSuccessAction` | `makeCreateFailureAction` |
| Read   | `makeReadRequestAction`   | `makeReadSuccessAction`   | `makeReadFailureAction`   |
| Update | `makeUpdateRequestAction` | `makeUpdateSuccessAction` | `makeUpdateFailureAction` |
| Delete | `makeDeleteRequestAction` | `makeDeleteSuccessAction` | `makeDeleteFailureAction` |

You should dispatch either `Success` or `Failure` action only following a corresponding `Request` action.

```js
const readThunk = dispatch => {
    dispatch(makeReadRequestAction('user', null));
    fetch('/users')
        .then(response => response.json())
        .then(items => {
            dispatch(makeReadSuccessAction('user', null, items));
        });
};

const mapDispatch = dispatch => ({
    read: () => dispatch(readThunk),
});
```


## List Component

Now that we have `items`, `status` and `read` props mapped, we can finally connect our `List` component.

```js
import { Component } from 'react';
import { Status } from 'redux-entity-manager';

class List extends Component {

    componentDidMount() {
        this.props.read();
    }

    render() {
        return this.props.status === Status.PENDING
            ? 'Loading...'
            : <ul>{this.props.items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
    }
}

export const ConnectedList = connect(mapState, mapDispatch)(List);
```
