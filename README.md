# Redux Entity Manager

[![Build Status](https://travis-ci.org/redux-entity-manager/redux-entity-manager.svg?branch=master)](https://travis-ci.org/redux-entity-manager/redux-entity-manager)

A framework-agnostic library for easy domain entity management


## Demo

[React with Redux and Thunk](https://codesandbox.io/embed/github/redux-entity-manager/redux-entity-manager/tree/master/examples/react-redux-thunk/demo)

*Coming soon: demo and examples using React with redux-observable and Angular with ngrx.*


## Prerequisites

1. Any Redux library such as Redux, ngrx or custom implementation.
2. Any side-effect library such as Redux Thunk, redux-observable, ngrx or custom implementation.
3. Domain entities must have a primary key.


## Installation

```
yarn add redux-entity-manager
```

or

```
npm install redux-entity-manager
```


## Motivation

In some Redux tutorials you have probably seen code that looks like this:

```js
const initialState = {
    selectedId: null,
    todos: [
        {
            id: 1,
            name: 'Foo',
        },
    ],
};
```

While this works fine for a simple project, in real life applications it will cause problems because:
- the state is [not normalized](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)
- client state and domain entities are mixed together.

A better state structure would look like this:

```json
{
    "entities": {
        "todo": {
            "1": {
                "id": 1,
                "name": "Foo"
            }
        }
    },
    "pages": {
        "account": {
            "todos": {
                "selectedId": null
            }
        }
    }
}
```

To create our root reducer for this state structure we'd probably write something like this:

```js
import { combineReducers } from 'your-favourite-redux-library';

const rootReducer = combineReducers({
    entities: {
        todo: todoReducer,
        user: userReducer,
        // Other entity reducers
    },
    // Other reducers
});
```

Notice that we have to write a separate reducer with its own actions and selectors for each entity.
Again, this is fine for simple projects, but what if we have dozens of domain entities?
A possible solution would be using a reducer factory:

```js
import { combineReducers } from 'your-favourite-redux-library';

const rootReducer = combineReducers({
    entities: {
        todo: makeEntityReducer('todo'),
        user: makeEntityReducer('user'),
        // Other entity reducers
    },
    // Other reducers
});
```

This approach has one more serious advantage: we can now create reusable components such as data tables, forms, etc.

React example:

```jsx
<DataTable entityName="todo" columns={['id', 'name']} />
<DataTable entityName="user" columns={['id', 'name', 'address', 'phone']} />
```

Angular example:

```html
<app-data-table entityName="todo" [columns]="['id', 'name']"></app-data-table>
<app-data-table entityName="user" [columns]="['id', 'name', 'address', 'phone']"></app-data-table>
```


## Basics

*Redux Entity Manager* provides a reducer factory, action creators and selectors.
All action creators and selectors have two mandatory parameters: `entityName` and `query` which are probably best explained by examples:

```js
const entityName = 'user';
const query = null;
const action = makeReadRequestAction(entityName, query);
const users = entitiesSelector(state, { entityName, query });
```

```js
const entityName = 'user';
const query = {
    id: 1,
};
const action = makeReadRequestAction(entityName, query);
const users = entitiesSelector(state, { entityName, query });
```

```js
const entityName = 'user';
const query = {
    page: 1,
    limit: 10,
};
const action = makeReadRequestAction(entityName, query);
const users = entitiesSelector(state, { entityName, query });
```

```js
const entityName = 'user';
const query = {
    banned: true,
};
const action = makeReadRequestAction(entityName, query);
const users = entitiesSelector(state, { entityName, query });
```

Think of how you write a SQL query:

```sql
SELECT * FROM users WHERE id = 1
```

or

```sql
SELECT * FROM users LIMIT 10
```

In *Redux Entity Manager*, `entityName` corresponds to table name in `FROM` clause, and `query` to everything else.
In fact, much like most RDBMSs, *Redux Entity Manager* will create an index for each `query` to avoid storing duplicate entities.

Please note that *Redux Entity Manager* only handles data in Redux store.
It is *your* responsibility to write side effects, i.e. http requests.
This is an intentional design decision that allows using
- any side effects library (e.g. Redux Thunk, redux-observable, ngrx, etc...)
- any architecture (REST, GraphQL, etc...)
- any additional logic (pagination, cache invalidation, undo/redo, etc...)


## Tutorials and Examples

- [Getting Started](./examples/react-redux-thunk/getting-started)
- [Queries](./examples/react-redux-thunk/queries)
- [Pagination](./examples/react-redux-thunk/pagination)
- [Forms](./examples/react-redux-thunk/forms)
- [Demo](./examples/react-redux-thunk/demo)


## Contributing

Improvements and bugfix PRs are welcome!

If you have an idea for a feature that would break API or tests, please open a discussion before submitting a PR.
