import { IDBPDatabase } from "idb"
import { SharedFlow } from "./SharedFlow"

export class DBDataFlow<T> extends SharedFlow<T | undefined> {
    constructor(
        private db: Promise<IDBPDatabase>,
        private store: string,
        private key: string | number,
    ) {
        super()
    }

    async emit(newValue: T): Promise<void> {
        await (await this.db).put(this.store, newValue, this.key)
        await super.emit(newValue)
    }

    async delete(): Promise<void> {
        await (await this.db).delete(this.store, this.key)
        await super.emit(undefined)
    }

    async loadValue(): Promise<T | undefined> {
        const dbValue = await (await this.db).get(this.store, this.key)
        // won't put to db when load value
        await super.emit(dbValue)
        return dbValue
    }

    async setKey(key: string | number): Promise<T | undefined> {
        this.key = key
        return this.loadValue()
    }
}

export function cachedDB(
    provider: () => Promise<IDBPDatabase>,
): Promise<IDBPDatabase> {
    let cached: IDBPDatabase | undefined = undefined
    return new Promise<IDBPDatabase>(async (resolve) => {
        if (!cached) {
            cached = await provider()
        }
        resolve(cached)
    })
}
