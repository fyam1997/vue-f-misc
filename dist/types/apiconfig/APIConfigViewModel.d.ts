import { APIConfigStore } from './Models';
export declare class APIConfigViewModel {
    private store;
    id: import('vue').Ref<number, number>;
    idList: import('vue').Ref<import('./Models').APIConfigIndex[], import('./Models').APIConfigIndex[]>;
    config: import('vue').Ref<{
        baseURL: string;
        apiKey: string;
        model: string;
    }, {
        baseURL: string;
        apiKey: string;
        model: string;
    }>;
    selectedIndex: import('vue').ComputedRef<import('./Models').APIConfigIndex>;
    constructor(store: APIConfigStore);
    saveBackup(): Promise<void>;
    loadBackup(): Promise<void>;
    addConfig(): Promise<void>;
    deleteConfig(): Promise<void>;
    selectConfig(id: number): Promise<void>;
    static readonly KEY: unique symbol;
    static injectOrCreate(): APIConfigViewModel;
}
