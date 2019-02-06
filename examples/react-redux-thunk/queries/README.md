# Queries

[Online Demo](https://codesandbox.io/embed/github/redux-entity-manager/redux-entity-manager/tree/master/examples/react-redux-thunk/queries)

Alternatively, you can run this example locally:

```
yarn start:local
```

or

```
npm run start:local
```


## Goals

In [previous tutorial](../getting-started) we wrote a component that displays a list of users.
Now we'll modify this component to be reusable for any entity and query by passing `entityName` and `query` props like this:

```jsx
<ConnectedList entityName="user" query={{ _page: 1 }} />
<ConnectedList entityName="post" query={{ _page: 2 }} />
```


## Mapping State to Props

Now that we are going to have a reusable `List` component, we'll need each one of them to have its own selector instance, so instead of using `mapState` function, we'll write a `makeMapState` factory. See [reselect docs](https://github.com/reduxjs/reselect#sharing-selectors-with-props-across-multiple-component-instances) for more details.

```js
const makeMapState = () => state => {
    const entitiesSelector = makeEntitiesSelector();
    return {
        items: entitiesSelector(state, { entityName: 'user', query: null }),
        status: readStatusSelector(state, { entityName: 'user', query: null }),
    };
};
```

Now we have to get rid of hardcoded values for `entityName` and `query`.
Fortunately, react-redux allows passing component's own props to selectors:

```js
const makeMapState = () => (state, props) => {
    const entitiesSelector = makeEntitiesSelector();
    const { entityName, query } = props;
    return {
        items: entitiesSelector(state, { entityName, query }),
        status: readStatusSelector(state, { entityName, query }),
    };
};
```


## Mapping Dispatch to Props

We can pass props to `makeMapDispatch` just like we did with `makeMapState`.

```jsx
const makeReadThunk = (entityName, query) => dispatch => {
    dispatch(makeReadRequestAction(entityName, query));
    fetch('/users')
        .then(response => response.json())
        .then(items => {
            dispatch(makeReadSuccessAction(entityName, query, items));
        });
};

const makeMapDispatch = () => (dispatch, props) => {
    const { entityName, query } = props;
    return {
        read: () => dispatch(makeReadThunk(entityName, query)),
    };
};
```

Now this looks fine except one thing: we're always making requests to `GET /users` regerdless of `entityName` and `query`.
To fix that we'll write a function that given `entityName` and `query` will return a corresponding url, for example:

```
user, {}           -> /users
post, {}           -> /posts
post, { _page: 1 } -> /posts?_page=1
```

Underscores are for easier mapping between `query` and urls because that's what [JSON server](https://github.com/typicode/json-server#paginate) used in this example expects.

```js
const makeUrl = (entityName, query) => {
    const baseUrl = `https://jsonplaceholder.typicode.com/${entityName}s`;
    const queryString = query
        ? Object.keys(query).map(k => `${k}=${query[k]}`).join('&')
        : null;
    return queryString
        ? `${baseUrl}?${queryString}`
        : baseUrl;
};

const makeReadThunk = (entityName, query) => dispatch => {
    ...
    const url = makeUrl(entityName, query);
    fetch(url)
        .then(...)
    ...
};
```
