import { createSelector } from 'reselect';

import {
    indexItemsCombiner,
    indexSelector,
    itemsSelector,
    makeReadRequestAction,
    makeReadSuccessAction,
    makeShouldReadCombiner,
    makeUpdateRequestAction,
    makeUpdateSuccessAction,
    readMetadataSelector,
    readStatusSelector,
    readTimestampsSelector,
} from 'redux-entity-manager';

export const entitiesSelector = createSelector(
    indexSelector,
    itemsSelector,
    indexItemsCombiner,
);

export const shouldReadSelector = createSelector(
    readStatusSelector,
    readTimestampsSelector,
    makeShouldReadCombiner(5000),
);

export const totalSelector = createSelector(
    readMetadataSelector,
    metadata => metadata ? metadata.total : null,
);

const makeUrl = (entityName, query) => {
    const { id, ...rest } = query || {};
    const url = process.env.REACT_APP_LOCAL
        ? '/'
        : 'https://jsonplaceholder.typicode.com/';
    const baseUrl = id
        ? `${url}${entityName}s/${id}`
        : `${url}${entityName}s`;
    const queryString = rest
        ? Object.keys(rest).map(k => `${k}=${rest[k]}`).join('&')
        : null;
    return queryString
        ? `${baseUrl}?${queryString}`
        : baseUrl;
};

export const makeReadThunk = (entityName, query) => (dispatch, getState) => {
    const state = getState();
    const shouldRead = shouldReadSelector(state, { entityName, query });
    if (shouldRead) {
        const url = makeUrl(entityName, query);
        dispatch(makeReadRequestAction(entityName, query));
        fetch(url)
            .then(response => {
                return response.json().then(body => ({
                    headers: response.headers,
                    body,
                }));
            })
            .then(response => {
                const items = Array.isArray(response.body)
                    ? response.body
                    : [response.body];
                const total = response.headers.get('x-total-count');
                const metadata = total
                    ? { total }
                    : null;
                dispatch(makeReadSuccessAction(entityName, query, items, null, metadata));
            });
    }
};

export const makeUpdateThunk = (entityName, query, item) => dispatch => {
    const url = makeUrl(entityName, query);
    dispatch(makeUpdateRequestAction(entityName, query, [item]));
    fetch(url, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })
        .then(response => response.json())
        .then(() => {
            dispatch(makeUpdateSuccessAction(entityName, query, [item]));
        });
};
