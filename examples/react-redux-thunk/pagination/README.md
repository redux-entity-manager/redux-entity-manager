# Pagination

[Online Demo](https://codesandbox.io/embed/github/redux-entity-manager/redux-entity-manager/tree/master/examples/react-redux-thunk/pagination)

Alternatively, you can run this example locally:

```
yarn start:local
```

or

```
npm run start:local
```


## Goals

In [previous tutorial](../queries) we wrote a reusable component that displays a list of entities. Time to add pagination. We won't be passing `query` prop anymore:

```jsx
<List entityName="user" />
<List entityName="post" />
```

Instead, the component will build `query` based on its internal state holding current page number.


## Total Selector

To add pagination we'll need a way to store total number of entities along with the actual entities.
*Redux Entity Manager* allows passing arbitrary metadata in `makeReadSuccessAction` (and all other `SuccessAction`s) like this:

```js
const makeReadThunk = (entityName, page) => dispatch => {
    const url = makeUrl(entityName, page);
    dispatch(makeReadRequestAction(entityName, { _page: page }));
    fetch(url)
        .then(response => {
            return response.json().then(body => ({
                headers: response.headers,
                body,
            }));
        })
        .then(response => {
            const items = response.body;
            const metadata = {
                total: response.headers.get('x-total-count'),
            };
            dispatch(makeReadSuccessAction(entityName, { _page: page }, items, metadata));
        });
};
```

Here is the corresponding selector:

```js
import { createSelector } from 'reselect';

import { metadataSelector } from 'redux-entity-manager';

const makeTotalSelector = () => createSelector(
    metadataSelector,
    metadata => metadata ? metadata.total : null,
);

const makeMapState = () => (state, props) => {
    const totalSelector = makeTotalSelector();
    const { entityName, page } = props;
    return {
        total: totalSelector(state, { entityName, query: { _page: page } }),
    };
};
```


## Throttling

*Redux Entity Manager* stores timestamps for all actions.
This allows throttling actions based on how recently the previous read action with the same `queryName` and `query` was dispatched.

```js
import {
    makeShouldReadCombiner,
    readStatusSelector,
    readTimestampsSelector,
} from 'redux-entity-manager';

const shouldReadSelector = createSelector(
    readStatusSelector,
    readTimestampsSelector,
    // Time in ms
    makeShouldReadCombiner(5000),
);

const makeReadThunk = (entityName, page) => (dispatch, getState) => {
    const url = makeUrl(entityName, page);
    const state = getState();
    const shouldRead = shouldReadSelector(state, { entityName, query: { _page: page } });
    if (shouldRead) {
        ...
    }
};
```
