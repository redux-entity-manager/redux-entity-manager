import {
    makeReadRequestAction,
    makeReadSuccessAction,
} from './actions';

import {
    Config,
    makeEntityReducer,
    State,
    Status,
} from './reducer';

describe('reducer', () => {

    const config = {
        entityName: 'user',
        primaryKey: 'id',
    };

    beforeEach(() => {
        Date.now = jest.fn(() => 0);
    });

    it('should have initial state', () => {
        const actualState = makeEntityReducer(config)(undefined, { type: null } as any);
        const expectedState: State<Config> = {
            config: {
                entityName: 'user',
                primaryKey: 'id',
            },
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
        };
        expect(actualState).toEqual(expectedState);
    });

    it('should handle read request action', () => {
        const state: State<Config> = {
            config: {
                entityName: 'user',
                primaryKey: 'id',
            },
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
        };
        const actualState = makeEntityReducer(config)(state, makeReadRequestAction('user', { page: 1 }));
        const expectedState: State<Config> = {
            config: {
                entityName: 'user',
                primaryKey: 'id',
            },
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
                status: {
                    '{"page":1}': Status.PENDING,
                },
                timestamps: {
                    '{"page":1}': 0,
                },
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
        };
        expect(actualState).toEqual(expectedState);
    });

    it('should handle read success action', () => {
        const state: State<Config> = {
            config: {
                entityName: 'user',
                primaryKey: 'id',
            },
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
                status: {
                    '{"page":1}': Status.PENDING,
                },
                timestamps: {
                    '{"page":1}': 0,
                },
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
        };
        const items = [
            {
                id: 1,
                name: 'Alice',
            },
            {
                id: 2,
                name: 'Bob',
            },
            {
                id: 3,
                name: 'Chris',
            },
            {
                id: 4,
                name: 'David',
            },
            {
                id: 5,
                name: 'Emily',
            },
        ];
        const actualState = makeEntityReducer(config)(state, makeReadSuccessAction('user', { page: 1 }, items));
        const expectedState: State<Config> = {
            config: {
                entityName: 'user',
                primaryKey: 'id',
            },
            items: {
                1: {
                    id: 1,
                    name: 'Alice',
                },
                2: {
                    id: 2,
                    name: 'Bob',
                },
                3: {
                    id: 3,
                    name: 'Chris',
                },
                4: {
                    id: 4,
                    name: 'David',
                },
                5: {
                    id: 5,
                    name: 'Emily',
                },
            },
            index: {
                '{"page":1}': [ 1, 2, 3, 4, 5 ],
            },
            metadata: {},
            create: {
                metadata: {},
                status: {},
                timestamps: {},
            },
            read: {
                metadata: {
                    '{"page":1}': {},
                },
                status: {
                    '{"page":1}': Status.SUCCESS,
                },
                timestamps: {
                    '{"page":1}': 0,
                },
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
        };
        expect(actualState).toEqual(expectedState);
    });
});
