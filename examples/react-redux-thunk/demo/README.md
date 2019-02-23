# Demo

[Online Demo](https://codesandbox.io/embed/github/redux-entity-manager/redux-entity-manager/tree/master/examples/react-redux-thunk/demo)

Alternatively, you can run this example locally:

```
yarn start:local
```

or

```
npm run start:local
```

This example builds upon ideas in [Pagination](../pagination) and [Forms](../forms) tutorials.

## Goals

This app showcases most features of *Redux Entity Manager*, such as actions corresponding to CRUD operations, request metadata, request throttling, etc.

Compared to the `List` component in [Pagination Example](../pagination), in this demo `Grid` features configurable columns and related entity renderers.
Similarly, `Form` featured configurable fields and related entity select components.


## Components

### Grid

```js
<Grid
    entityName="user"
    query={{ _page: 1 }}
    columns={[
        {
            key: 'id',
            label: 'ID',
        },
        {
            key: 'name',
            label: 'Name',
        },
    ]}
/>
```

### Renderer

```js
<ConnectedRenderer
    entityName="user"
    query={null}
    labelKey="name"
    valueKey="id"
/>
```

```js
<Grid
    entityName="user"
    query={{ _page: 1 }}
    columns={[
        ...
        {
            key: 'userId',
            label: 'User',
            entityName: 'user',
            query: null,
            labelKey: 'name',
            valueKey: 'id',
        },
        ...
    ]}
/>
```

### Form

```js
<ConnectedForm
    entityName="user"
    query={{ id: 1 }}
    fields={[
        {
            key: 'id',
            label: 'ID',
            readonly: true,
        },
        {
            key: 'name',
            label: 'Name',
        },
    ]}
/>
```

### Select

```js
<ConnectedSelect
    entityName="user"
    query={null}
    name="userId"
    labelKey="name"
/>
```

```js
<ConnectedForm
    entityName="user"
    query={{ id: 1 }}
    fields={[
        ...
        {
            key: 'userId',
            label: 'User',
            entityName: 'user',
            query: null,
            labelKey: 'name',
        },
        ...
    ]}
/>
```
