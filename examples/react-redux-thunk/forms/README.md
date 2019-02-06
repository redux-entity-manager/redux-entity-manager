# Forms

[Online Demo](https://codesandbox.io/embed/github/redux-entity-manager/redux-entity-manager/tree/master/examples/react-redux-thunk/forms)

Alternatively, you can run this example locally:

```
yarn start:local
```

or

```
npm run start:local
```


## Goals

So far we've been concerned only with fetching entities from server.
In this tutorial we'll learnt how to create a form to update a user.
We'll use `formik` package for forms.


## Mapping Dispatch to Props

Note that `makeUpdateRequestAction` and `makeUpdateSuccessAction` are similar to their corresponding `makeRead<...>Action`s, except you should also pass an *array* of updated entities. Each entity *must* have primary key, otherwise *Redux Entity Manager* wouldn't know which entity to update.

```js
const makeUpdateThunk = item => dispatch => {
    const url = makeUrl();
    dispatch(makeUpdateRequestAction('user', { id: 1 }, [ item ]));
    fetch(url, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })
    .then(response => response.json())
    .then(() => {
        dispatch(makeUpdateSuccessAction('user', { id: 1 }, [ item ]));
    });
};

const mapDispatch = dispatch => ({
    update: item => dispatch(makeUpdateThunk(item)),
});
```
