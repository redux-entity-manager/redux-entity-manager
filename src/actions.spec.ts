import {
    ActionType,
    CreateFailureAction,
    CreateRequestAction,
    CreateSuccessAction,
    DeleteFailureAction,
    DeleteRequestAction,
    DeleteSuccessAction,
    makeCreateFailureAction,
    makeCreateRequestAction,
    makeCreateSuccessAction,
    makeDeleteFailureAction,
    makeDeleteRequestAction,
    makeDeleteSuccessAction,
    makeReadFailureAction,
    makeReadRequestAction,
    makeReadSuccessAction,
    makeUpdateFailureAction,
    makeUpdateRequestAction,
    makeUpdateSuccessAction,
    ReadFailureAction,
    ReadRequestAction,
    ReadSuccessAction,
    UpdateFailureAction,
    UpdateRequestAction,
    UpdateSuccessAction,
} from './actions';

describe('actions', () => {

    beforeEach(() => {
        Date.now = jest.fn(() => 0);
    });

    it('should make create request action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const items = [];
        const actualAction = makeCreateRequestAction(entityName, query, items);
        const expectedAction: CreateRequestAction = {
            type: ActionType.CREATE_REQUEST,
            payload: {
                entityName,
                query,
                items,
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });

    it('should make create success action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const items = [];
        const actualAction = makeCreateSuccessAction(entityName, query, items);
        const expectedAction: CreateSuccessAction = {
            type: ActionType.CREATE_SUCCESS,
            payload: {
                entityName,
                query,
                items,
                metadata: {},
                createMetadata: {},
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });

    it('should make create failure action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const items = [];
        const actualAction = makeCreateFailureAction(entityName, query, items);
        const expectedAction: CreateFailureAction = {
            type: ActionType.CREATE_FAILURE,
            payload: {
                entityName,
                query,
                items,
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });

    it('should make read request action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const actualAction = makeReadRequestAction(entityName, query);
        const expectedAction: ReadRequestAction = {
            type: ActionType.READ_REQUEST,
            payload: {
                entityName,
                query,
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });

    it('should make read success action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const items = [];
        const actualAction = makeReadSuccessAction(entityName, query, items);
        const expectedAction: ReadSuccessAction = {
            type: ActionType.READ_SUCCESS,
            payload: {
                entityName,
                query,
                items,
                metadata: {},
                readMetadata: {},
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });

    it('should make read failure action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const actualAction = makeReadFailureAction(entityName, query);
        const expectedAction: ReadFailureAction = {
            type: ActionType.READ_FAILURE,
            payload: {
                entityName,
                query,
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });

    it('should make update request action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const items = [];
        const actualAction = makeUpdateRequestAction(entityName, query, items);
        const expectedAction: UpdateRequestAction = {
            type: ActionType.UPDATE_REQUEST,
            payload: {
                entityName,
                query,
                items,
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });

    it('should make update success action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const items = [];
        const actualAction = makeUpdateSuccessAction(entityName, query, items);
        const expectedAction: UpdateSuccessAction = {
            type: ActionType.UPDATE_SUCCESS,
            payload: {
                entityName,
                query,
                items,
                metadata: {},
                updateMetadata: {},
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });

    it('should make update failure action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const items = [];
        const actualAction = makeUpdateFailureAction(entityName, query, items);
        const expectedAction: UpdateFailureAction = {
            type: ActionType.UPDATE_FAILURE,
            payload: {
                entityName,
                query,
                items,
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });

    it('should make delete request action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const items = [];
        const actualAction = makeDeleteRequestAction(entityName, query, items);
        const expectedAction: DeleteRequestAction = {
            type: ActionType.DELETE_REQUEST,
            payload: {
                entityName,
                query,
                items,
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });

    it('should make delete success action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const items = [];
        const actualAction = makeDeleteSuccessAction(entityName, query, items);
        const expectedAction: DeleteSuccessAction = {
            type: ActionType.DELETE_SUCCESS,
            payload: {
                entityName,
                query,
                items,
                metadata: {},
                deleteMetadata: {},
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });

    it('should make delete failure action', () => {
        const entityName = 'Foo';
        const query = {
            url: '/foo',
        };
        const items = [];
        const actualAction = makeDeleteFailureAction(entityName, query, items);
        const expectedAction: DeleteFailureAction = {
            type: ActionType.DELETE_FAILURE,
            payload: {
                entityName,
                query,
                items,
                timestamp: Date.now(),
            },
        };
        expect(actualAction).toEqual(expectedAction);
    });
});
