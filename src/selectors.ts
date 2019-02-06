import { State, Status } from './reducer';
import { Query, serializeQuery } from './utils';

export interface Props {
    entityName: string;
    query: Query;
}

export interface PropsWithItems {
    entityName: string;
    query: Query;
    items: any[];
}

export interface GlobalState {
    entities: Record<string, State<any>>;
}

const getState = (state: GlobalState, props: Props): State<any> => state.entities[props.entityName];

export const indexSelector = (state: GlobalState, props: Props) => {
    const key = serializeQuery(props.query);
    return getState(state, props).index[key] || [];
};

export const itemsSelector = (state: GlobalState, props: Props) => {
    return getState(state, props).items;
};

export const configSelector = (state: GlobalState, props: Props) => {
    return getState(state, props).config;
};

export const metadataSelector = (state: GlobalState, props: Props) => {
    return getState(state, props).metadata;
};

export const createMetadataSelector = (state: GlobalState, props: Props) => {
    const { query } = props;
    const key = serializeQuery({ query });
    return getState(state, props).create.metadata[key];
};

export const createMetadataForQueryAndItemsSelector = (state: GlobalState, props: PropsWithItems) => {
    const { query, items } = props;
    const key = serializeQuery({ query, items });
    return getState(state, props).create.metadata[key];
};

export const createStatusSelector = (state: GlobalState, props: Props) => {
    const { query } = props;
    const key = serializeQuery({ query });
    return getState(state, props).create.status[key];
};

export const createStatusForQueryAndItemsSelector = (state: GlobalState, props: PropsWithItems) => {
    const { query, items } = props;
    const key = serializeQuery({ query, items });
    return getState(state, props).create.status[key];
};

export const createTimestampsSelector = (state: GlobalState, props: Props) => {
    const { query } = props;
    const key = serializeQuery({ query });
    return getState(state, props).create.timestamps[key];
};

export const createTimestampsForQueryAndItemsSelector = (state: GlobalState, props: PropsWithItems) => {
    const { query, items } = props;
    const key = serializeQuery({ query, items });
    return getState(state, props).create.timestamps[key];
};

export const readMetadataSelector = (state: GlobalState, props: Props) => {
    const key = serializeQuery(props.query);
    return getState(state, props).read.metadata[key];
};

export const readStatusSelector = (state: GlobalState, props: Props) => {
    const key = serializeQuery(props.query);
    return getState(state, props).read.status[key];
};

export const readTimestampsSelector = (state: GlobalState, props: Props) => {
    const key = serializeQuery(props.query);
    return getState(state, props).read.timestamps[key];
};

export const updateMetadataSelector = (state: GlobalState, props: Props) => {
    const { query } = props;
    const key = serializeQuery({ query });
    return getState(state, props).update.metadata[key];
};

export const updateMetadataForQueryAndItemsSelector = (state: GlobalState, props: PropsWithItems) => {
    const { query, items } = props;
    const key = serializeQuery({ query, items });
    return getState(state, props).update.metadata[key];
};

export const updateStatusSelector = (state: GlobalState, props: Props) => {
    const { query } = props;
    const key = serializeQuery({ query });
    return getState(state, props).update.status[key];
};

export const updateStatusForQueryAndItemsSelector = (state: GlobalState, props: PropsWithItems) => {
    const { query, items } = props;
    const key = serializeQuery({ query, items });
    return getState(state, props).update.status[key];
};

export const updateTimestampsSelector = (state: GlobalState, props: Props) => {
    const { query } = props;
    const key = serializeQuery({ query });
    return getState(state, props).update.timestamps[key];
};

export const updateTimestampsForQueryAndItemsSelector = (state: GlobalState, props: PropsWithItems) => {
    const { query, items } = props;
    const key = serializeQuery({ query, items });
    return getState(state, props).update.timestamps[key];
};

export const deleteMetadataSelector = (state: GlobalState, props: Props) => {
    const { query } = props;
    const key = serializeQuery({ query });
    return getState(state, props).delete.metadata[key];
};

export const deleteMetadataForQueryAndItemsSelector = (state: GlobalState, props: PropsWithItems) => {
    const { query, items } = props;
    const key = serializeQuery({ query, items });
    return getState(state, props).delete.metadata[key];
};

export const deleteStatusSelector = (state: GlobalState, props: Props) => {
    const { query } = props;
    const key = serializeQuery({ query });
    return getState(state, props).delete.status[key];
};

export const deleteStatusForQueryAndItemsSelector = (state: GlobalState, props: PropsWithItems) => {
    const { query, items } = props;
    const key = serializeQuery({ query, items });
    return getState(state, props).delete.status[key];
};

export const deleteTimestampsSelector = (state: GlobalState, props: Props) => {
    const { query } = props;
    const key = serializeQuery({ query });
    return getState(state, props).delete.timestamps[key];
};

export const deleteTimestampsForQueryAndItemsSelector = (state: GlobalState, props: PropsWithItems) => {
    const { query, items } = props;
    const key = serializeQuery({ query, items });
    return getState(state, props).delete.timestamps[key];
};

export const indexItemsCombiner = (index: number[], items: Record<any, any>) => {
    return index.map(i => items[i]).filter(Boolean);
};

export const makeShouldReadCombiner = (threshold: number = 0) => (status: Status, timestamp: number) => {
    return (status !== Status.SUCCESS || Date.now() - timestamp > threshold) && (status !== Status.PENDING);
};
