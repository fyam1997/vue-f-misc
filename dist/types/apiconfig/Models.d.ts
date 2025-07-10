export interface APIConfigModel {
    baseURL: string;
    apiKey: string;
    model: string;
}
export interface APIConfigIndex {
    id: number;
    name: string;
}
export interface APIConfigBackup {
    configs: {
        config: APIConfigModel;
        index: APIConfigIndex;
    }[];
}
export declare class APIConfigStore {
    googleClientID: string;
    id: import('..').DBDataFlow<number>;
    idList: import('..').DBDataFlow<APIConfigIndex[]>;
    config: import('..').DBDataFlow<APIConfigModel>;
    constructor(googleClientID: string);
    init(): Promise<void>;
    static readonly KEY: unique symbol;
}
