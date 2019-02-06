import { Config, State } from './reducer';
import { indexSelector } from './selectors';

describe('selectors', () => {

    const state: State<Config> = {
        config: {
            entityName: 'user',
            primaryKey: 'id',
        },
        items: {},
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

    beforeEach(() => {
        Date.now = jest.fn(() => 0);
    });

    it('should select index', () => {
        const actualResult = indexSelector({ entities: { foo: state } }, { entityName: 'foo', query: { page: 1} });
        const expectedResult = [ 1, 2, 3, 4, 5 ];
        expect(actualResult).toEqual(expectedResult);
    });
});
