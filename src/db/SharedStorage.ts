import {openDB} from "idb";
import {cachedDB, DBDataFlow} from "./DBDataFlow";

export enum SharedStore {
    APIConfig = "APIConfig",
}

const sharedDB = cachedDB(() => {
    return openDB("shared", 1, {
        upgrade(db) {
            db.createObjectStore(SharedStore.APIConfig)
        },
    })
})

export function apiConfig<T>(key: string | number) {
    return new DBDataFlow<T>(sharedDB, SharedStore.APIConfig, key)
}
