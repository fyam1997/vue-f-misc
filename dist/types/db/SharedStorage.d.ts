import { DBDataFlow } from './DBDataFlow';
export declare enum SharedStore {
    APIConfig = "APIConfig"
}
export declare function apiConfig<T>(key: string | number): DBDataFlow<T>;
