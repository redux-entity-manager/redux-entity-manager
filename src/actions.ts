import { Query } from './utils';

export enum ActionType {
    CREATE_REQUEST = '[entity manager] create request',
    CREATE_SUCCESS = '[entity manager] create success',
    CREATE_FAILURE = '[entity manager] create failure',
    READ_REQUEST   = '[entity manager] read request',
    READ_SUCCESS   = '[entity manager] read success',
    READ_FAILURE   = '[entity manager] read failure',
    UPDATE_REQUEST = '[entity manager] update request',
    UPDATE_SUCCESS = '[entity manager] update success',
    UPDATE_FAILURE = '[entity manager] update failure',
    DELETE_REQUEST = '[entity manager] delete request',
    DELETE_SUCCESS = '[entity manager] delete success',
    DELETE_FAILURE = '[entity manager] delete failure',
}

export interface CreateRequestAction {
    type: ActionType.CREATE_REQUEST;
    payload: {
        entityName: string;
        query: Query;
        items: any[];
        timestamp: number;
    };
}

export interface CreateSuccessAction {
    type: ActionType.CREATE_SUCCESS;
    payload: {
        entityName: string;
        query: Query;
        items: any[];
        metadata: any;
        createMetadata: any;
        timestamp: number;
    };
}

export interface CreateFailureAction {
    type: ActionType.CREATE_FAILURE;
    payload: {
        entityName: string;
        query: Query;
        items: any[];
        timestamp: number;
    };
}

export type CreateAction = CreateRequestAction | CreateSuccessAction | CreateFailureAction;

export interface ReadRequestAction {
    type: ActionType.READ_REQUEST;
    payload: {
        entityName: string;
        query: Query;
        timestamp: number;
    };
}

export interface ReadSuccessAction {
    type: ActionType.READ_SUCCESS;
    payload: {
        entityName: string;
        query: Query;
        items: any[];
        metadata: any;
        readMetadata: any;
        timestamp: number;
    };
}

export interface ReadFailureAction {
    type: ActionType.READ_FAILURE;
    payload: {
        entityName: string;
        query: Query;
        timestamp: number;
    };
}

export type ReadAction = ReadRequestAction | ReadSuccessAction | ReadFailureAction;

export interface UpdateRequestAction {
    type: ActionType.UPDATE_REQUEST;
    payload: {
        entityName: string;
        query: Query;
        items: any[];
        timestamp: number;
    };
}

export interface UpdateSuccessAction {
    type: ActionType.UPDATE_SUCCESS;
    payload: {
        entityName: string;
        query: Query;
        items: any[];
        metadata: any;
        updateMetadata: any;
        timestamp: number;
    };
}

export interface UpdateFailureAction {
    type: ActionType.UPDATE_FAILURE;
    payload: {
        entityName: string;
        query: Query;
        items: any[];
        timestamp: number;
    };
}

export type UpdateAction = UpdateRequestAction | UpdateSuccessAction | UpdateFailureAction;

export interface DeleteRequestAction {
    type: ActionType.DELETE_REQUEST;
    payload: {
        entityName: string;
        query: Query;
        items: any[];
        timestamp: number;
    };
}

export interface DeleteSuccessAction {
    type: ActionType.DELETE_SUCCESS;
    payload: {
        entityName: string;
        query: Query;
        items: any[];
        metadata: any;
        deleteMetadata: any;
        timestamp: number;
    };
}

export interface DeleteFailureAction {
    type: ActionType.DELETE_FAILURE;
    payload: {
        entityName: string;
        query: Query;
        items: any[];
        timestamp: number;
    };
}

export type DeleteAction = DeleteRequestAction | DeleteSuccessAction | DeleteFailureAction;

export type Action = CreateAction | ReadAction | UpdateAction | DeleteAction;

/**
 * Make Create Request Action
 * @param {string} entityName q
 * @param {Query} query q
 * @param {any[]} items q
 * @param {number} timestamp q
 * @returns {number} q
 */
export const makeCreateRequestAction = (
    entityName: string,
    query: Query,
    items: any[],
    timestamp = Date.now(),
): CreateRequestAction => ({
    type: ActionType.CREATE_REQUEST,
    payload: {
        entityName,
        query,
        items,
        timestamp,
    },
});

export const makeCreateSuccessAction = (
    entityName: string,
    query: Query,
    items: any[],
    metadata = {},
    createMetadata = {},
    timestamp = Date.now(),
): CreateSuccessAction => ({
    type: ActionType.CREATE_SUCCESS,
    payload: {
        entityName,
        query,
        items,
        metadata,
        createMetadata,
        timestamp,
    },
});

export const makeCreateFailureAction = (
    entityName: string,
    query: Query,
    items: any[],
    timestamp = Date.now(),
): CreateFailureAction => ({
    type: ActionType.CREATE_FAILURE,
    payload: {
        entityName,
        query,
        items,
        timestamp,
    },
});

export const makeReadRequestAction = (
    entityName: string,
    query: Query,
    timestamp = Date.now(),
): ReadRequestAction => ({
    type: ActionType.READ_REQUEST,
    payload: {
        entityName,
        query,
        timestamp,
    },
});

export const makeReadSuccessAction = (
    entityName: string,
    query: Query,
    items: any[],
    metadata = {},
    readMetadata = {},
    timestamp = Date.now(),
): ReadSuccessAction => ({
    type: ActionType.READ_SUCCESS,
    payload: {
        entityName,
        query,
        items,
        metadata,
        readMetadata,
        timestamp,
    },
});

export const makeReadFailureAction = (
    entityName: string,
    query: Query,
    timestamp = Date.now(),
): ReadFailureAction => ({
    type: ActionType.READ_FAILURE,
    payload: {
        entityName,
        query,
        timestamp,
    },
});

export const makeUpdateRequestAction = (
    entityName: string,
    query: Query,
    items: any[],
    timestamp = Date.now(),
): UpdateRequestAction => ({
    type: ActionType.UPDATE_REQUEST,
    payload: {
        entityName,
        query,
        items,
        timestamp,
    },
});

export const makeUpdateSuccessAction = (
    entityName: string,
    query: Query,
    items: any[],
    metadata = {},
    updateMetadata = {},
    timestamp = Date.now(),
): UpdateSuccessAction => ({
    type: ActionType.UPDATE_SUCCESS,
    payload: {
        entityName,
        query,
        items,
        metadata,
        updateMetadata,
        timestamp,
    },
});

export const makeUpdateFailureAction = (
    entityName: string,
    query: Query,
    items: any[],
    timestamp = Date.now(),
): UpdateFailureAction => ({
    type: ActionType.UPDATE_FAILURE,
    payload: {
        entityName,
        query,
        items,
        timestamp,
    },
});

export const makeDeleteRequestAction = (
    entityName: string,
    query: Query,
    items: any[],
    timestamp = Date.now(),
): DeleteRequestAction => ({
    type: ActionType.DELETE_REQUEST,
    payload: {
        entityName,
        query,
        items,
        timestamp,
    },
});

export const makeDeleteSuccessAction = (
    entityName: string,
    query: Query,
    items: any[],
    metadata = {},
    deleteMetadata = {},
    timestamp = Date.now(),
): DeleteSuccessAction => ({
    type: ActionType.DELETE_SUCCESS,
    payload: {
        entityName,
        query,
        items,
        metadata,
        deleteMetadata,
        timestamp,
    },
});

export const makeDeleteFailureAction = (
    entityName: string,
    query: Query,
    items: any[],
    timestamp = Date.now(),
): DeleteFailureAction => ({
    type: ActionType.DELETE_FAILURE,
    payload: {
        entityName,
        query,
        items,
        timestamp,
    },
});
