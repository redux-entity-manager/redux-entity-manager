export interface Query {
    [key: string]: any;
}

export const serializeQuery = (query: Query): string => JSON.stringify(query);
