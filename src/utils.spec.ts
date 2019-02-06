import { serializeQuery } from './utils';

describe('utils', () => {

    it('should serialize query', () => {
        const query = { page: 1 };
        const serializedQuery = serializeQuery(query);
        expect(serializedQuery).toBeTruthy();
    });
});
