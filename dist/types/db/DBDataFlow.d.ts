import { IDBPDatabase } from 'idb';
import { SharedFlow } from './SharedFlow';
export declare class DBDataFlow<T> extends SharedFlow<T | undefined> {
    private db;
    private store;
    private key;
    constructor(db: Promise<IDBPDatabase>, store: string, key: string | number);
    emit(newValue: T | undefined): Promise<void>;
    loadValue(): Promise<T | undefined>;
    setKey(key: string | number): Promise<T | undefined>;
}
export declare function cachedDB(provider: () => Promise<IDBPDatabase>): Promise<IDBPDatabase>;
