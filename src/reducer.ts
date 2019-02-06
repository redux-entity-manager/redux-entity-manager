import {
    Action,
    ActionType,
    CreateFailureAction,
    CreateRequestAction,
    CreateSuccessAction,
    DeleteFailureAction,
    DeleteRequestAction,
    DeleteSuccessAction,
    ReadFailureAction,
    ReadRequestAction,
    ReadSuccessAction,
    UpdateFailureAction,
    UpdateRequestAction,
    UpdateSuccessAction,
} from './actions';
import { serializeQuery } from './utils';

export interface Config {
    entityName: string;
    primaryKey: string;
}

export enum Status {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export interface State<C extends Config> {
    config: C;
    items: {
        [key: number]: any;
    };
    index: {
        [key: string]: number[];
    };
    metadata: any;
    create: {
        metadata: {
            [key: string]: any;
        };
        status: {
            [key: string]: Status;
        };
        timestamps: {
            [key: string]: number;
        };
    };
    read: {
        metadata: {
            [key: string]: any;
        };
        status: {
            [key: string]: Status;
        };
        timestamps: {
            [key: string]: number;
        };
    };
    update: {
        metadata: {
            [key: string]: any;
        };
        status: {
            [key: string]: Status;
        };
        timestamps: {
            [key: string]: number;
        };
    };
    delete: {
        metadata: {
            [key: string]: any;
        };
        status: {
            [key: string]: Status;
        };
        timestamps: {
            [key: string]: number;
        };
    };
}

export const makeInitialState = <C extends Config>(config: C): State<C> => ({
    config,
    items: {},
    index: {},
    metadata: {},
    create: {
        metadata: {},
        status: {},
        timestamps: {},
    },
    read: {
        metadata: {},
        status: {},
        timestamps: {},
    },
    update: {
        metadata: {},
        status: {},
        timestamps: {},
    },
    delete: {
        metadata: {},
        status: {},
        timestamps: {},
    },
});

export const handleCreateRequestAction = (state: State<any>, action: CreateRequestAction): State<any> => {
    const { query, timestamp, items } = action.payload;
    const key = serializeQuery({ query });
    const keyFull = serializeQuery({ query, items });
    return {
        ...state,
        create: {
            ...state.create,
            status: {
                ...state.create.status,
                [key]: Status.PENDING,
                [keyFull]: Status.PENDING,
            },
            timestamps: {
                ...state.create.timestamps,
                [key]: timestamp,
                [keyFull]: timestamp,
            },
        },
    };
};

export const handleCreateSuccessAction = (state: State<any>, action: CreateSuccessAction): State<any> => {
    const { primaryKey } = state.config;
    const { items, query, timestamp, metadata, createMetadata } = action.payload;
    const key = serializeQuery({ query });
    const keyFull = serializeQuery({ query, items });
    return {
        ...state,
        items: {
            ...state.items,
            ...items.reduce((acc, item) => ({ ...acc, [item[primaryKey]]: item }), {}),
        },
        metadata: {
            ...state.metadata,
            ...metadata,
        },
        create: {
            ...state.create,
            status: {
                ...state.create.status,
                [key]: Status.SUCCESS,
                [keyFull]: Status.SUCCESS,
            },
            timestamps: {
                ...state.create.timestamps,
                [key]: timestamp,
                [keyFull]: timestamp,
            },
            metadata: {
                ...state.create.metadata,
                [key]: createMetadata,
                [keyFull]: createMetadata,
            },
        },
    };
};

export const handleCreateFailureAction = (state: State<any>, action: CreateFailureAction): State<any> => {
    const { query, timestamp, items } = action.payload;
    const key = serializeQuery({ query });
    const keyFull = serializeQuery({ query, items });
    return {
        ...state,
        create: {
            ...state.create,
            status: {
                ...state.create.status,
                [key]: Status.FAILURE,
                [keyFull]: Status.FAILURE,
            },
            timestamps: {
                ...state.create.timestamps,
                [key]: timestamp,
                [keyFull]: timestamp,
            },
        },
    };
};

export const handleReadRequestAction = (state: State<any>, action: ReadRequestAction): State<any> => {
    const { query, timestamp } = action.payload;
    const key = serializeQuery(query);
    return {
        ...state,
        read: {
            ...state.read,
            status: {
                ...state.read.status,
                [key]: Status.PENDING,
            },
            timestamps: {
                ...state.read.timestamps,
                [key]: timestamp,
            },
        },
    };
};

export const handleReadSuccessAction = (state: State<any>, action: ReadSuccessAction): State<any> => {
    const { primaryKey } = state.config;
    const { items, query, timestamp, metadata, readMetadata } = action.payload;
    const key = serializeQuery(query);
    return {
        ...state,
        items: {
            ...state.items,
            ...items.reduce((acc, item) => ({ ...acc, [item[primaryKey]]: item }), {}),
        },
        index: {
            ...state.index,
            [key]: items.map(item => item[primaryKey]),
        },
        metadata: {
            ...state.metadata,
            ...metadata,
        },
        read: {
            ...state.read,
            status: {
                ...state.read.status,
                [key]: Status.SUCCESS,
            },
            timestamps: {
                ...state.read.timestamps,
                [key]: timestamp,
            },
            metadata: {
                ...state.read.metadata,
                [key]: readMetadata,
            },
        },
    };
};

export const handleReadFailureAction = (state: State<any>, action: ReadFailureAction): State<any> => {
    const { query, timestamp } = action.payload;
    const key = serializeQuery(query);
    return {
        ...state,
        read: {
            ...state.read,
            status: {
                ...state.read.status,
                [key]: Status.FAILURE,
            },
            timestamps: {
                ...state.read.timestamps,
                [key]: timestamp,
            },
        },
    };
};

export const handleUpdateRequestAction = (state: State<any>, action: UpdateRequestAction): State<any> => {
    const { query, timestamp, items } = action.payload;
    const key = serializeQuery({ query });
    const keyFull = serializeQuery({ query, items });
    return {
        ...state,
        update: {
            ...state.update,
            status: {
                ...state.update.status,
                [key]: Status.PENDING,
                [keyFull]: Status.PENDING,
            },
            timestamps: {
                ...state.update.timestamps,
                [key]: timestamp,
                [keyFull]: timestamp,
            },
        },
    };
};

export const handleUpdateSuccessAction = (state: State<any>, action: UpdateSuccessAction): State<any> => {
    const { primaryKey } = state.config;
    const { items, query, timestamp, metadata, updateMetadata } = action.payload;
    const key = serializeQuery({ query });
    const keyFull = serializeQuery({ query, items });
    return {
        ...state,
        items: {
            ...state.items,
            ...items.reduce((acc, item) => {
                const id = item[primaryKey];
                return {
                    ...acc,
                    [id]: {
                        ...state.items[id],
                        ...item,
                    },
                };
            }, {}),
        },
        metadata: {
            ...state.metadata,
            ...metadata,
        },
        update: {
            ...state.update,
            status: {
                ...state.update.status,
                [key]: Status.SUCCESS,
                [keyFull]: Status.SUCCESS,
            },
            timestamps: {
                ...state.update.timestamps,
                [key]: timestamp,
                [keyFull]: timestamp,
            },
            metadata: {
                ...state.update.metadata,
                [key]: updateMetadata,
                [keyFull]: updateMetadata,
            },
        },
    };
};

export const handleUpdateFailureAction = (state: State<any>, action: UpdateFailureAction): State<any> => {
    const { query, timestamp, items } = action.payload;
    const key = serializeQuery({ query });
    const keyFull = serializeQuery({ query, items });
    return {
        ...state,
        update: {
            ...state.update,
            status: {
                ...state.update.status,
                [key]: Status.FAILURE,
                [keyFull]: Status.FAILURE,
            },
            timestamps: {
                ...state.update.timestamps,
                [key]: timestamp,
                [keyFull]: timestamp,
            },
        },
    };
};

export const handleDeleteRequestAction = (state: State<any>, action: DeleteRequestAction): State<any> => {
    const { query, timestamp, items } = action.payload;
    const key = serializeQuery({ query });
    const keyFull = serializeQuery({ query, items });
    return {
        ...state,
        delete: {
            ...state.delete,
            status: {
                ...state.delete.status,
                [key]: Status.PENDING,
                [keyFull]: Status.PENDING,
            },
            timestamps: {
                ...state.delete.timestamps,
                [key]: timestamp,
                [keyFull]: timestamp,
            },
        },
    };
};

export const handleDeleteSuccessAction = (state: State<any>, action: DeleteSuccessAction): State<any> => {
    const { primaryKey } = state.config;
    const { query, timestamp, items, metadata, deleteMetadata } = action.payload;
    const key = serializeQuery({ query });
    const keyFull = serializeQuery({ query, items });
    return {
        ...state,
        metadata: {
            ...state.metadata,
            ...metadata,
        },
        items: {
            ...state.items,
            ...items.reduce((acc, item) => ({ ...acc, [item[primaryKey]]: undefined }), {}),
        },
        delete: {
            status: {
                ...state.delete.status,
                [key]: Status.SUCCESS,
                [keyFull]: Status.SUCCESS,
            },
            timestamps: {
                ...state.delete.timestamps,
                [key]: timestamp,
                [keyFull]: timestamp,
            },
            metadata: {
                ...state.delete.metadata,
                [key]: deleteMetadata,
                [keyFull]: deleteMetadata,
            },
        },
    };
};

export const handleDeleteFailureAction = (state: State<any>, action: DeleteFailureAction) => {
    const { query, timestamp, items } = action.payload;
    const key = serializeQuery({ query });
    const keyFull = serializeQuery({ query, items });
    return {
        ...state,
        delete: {
            ...state.delete,
            status: {
                ...state.delete.status,
                [key]: Status.FAILURE,
                [keyFull]: Status.FAILURE,
            },
            timestamps: {
                ...state.delete.timestamps,
                [key]: timestamp,
                [keyFull]: timestamp,
            },
        },
    };
};

export const makeEntityReducer = <C extends Config>(config: C) => {
    const initialState = makeInitialState(config);
    return (state = initialState, action: Action): State<C> => {
        switch (action.type) {
            case ActionType.CREATE_REQUEST:
                return action.payload.entityName === state.config.entityName
                    ? handleCreateRequestAction(state, action)
                    : state;
            case ActionType.CREATE_SUCCESS:
                return action.payload.entityName === state.config.entityName
                    ? handleCreateSuccessAction(state, action)
                    : state;
            case ActionType.CREATE_FAILURE:
                return action.payload.entityName === state.config.entityName
                    ? handleCreateFailureAction(state, action)
                    : state;
            case ActionType.READ_REQUEST:
                return action.payload.entityName === state.config.entityName
                    ? handleReadRequestAction(state, action)
                    : state;
            case ActionType.READ_SUCCESS:
                return action.payload.entityName === state.config.entityName
                    ? handleReadSuccessAction(state, action)
                    : state;
            case ActionType.READ_FAILURE:
                return action.payload.entityName === state.config.entityName
                    ? handleReadFailureAction(state, action)
                    : state;
            case ActionType.UPDATE_REQUEST:
                return action.payload.entityName === state.config.entityName
                    ? handleUpdateRequestAction(state, action)
                    : state;
            case ActionType.UPDATE_SUCCESS:
                return action.payload.entityName === state.config.entityName
                    ? handleUpdateSuccessAction(state, action)
                    : state;
            case ActionType.UPDATE_FAILURE:
                return action.payload.entityName === state.config.entityName
                    ? handleUpdateFailureAction(state, action)
                    : state;
            case ActionType.DELETE_REQUEST:
                return action.payload.entityName === state.config.entityName
                    ? handleDeleteRequestAction(state, action)
                    : state;
            case ActionType.DELETE_SUCCESS:
                return action.payload.entityName === state.config.entityName
                    ? handleDeleteSuccessAction(state, action)
                    : state;
            case ActionType.DELETE_FAILURE:
                return action.payload.entityName === state.config.entityName
                    ? handleDeleteFailureAction(state, action)
                    : state;
            default:
                return state;
        }
    };
};
