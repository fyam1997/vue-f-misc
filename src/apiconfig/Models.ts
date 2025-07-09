import {apiConfig} from "../db/SharedStorage";

export interface APIConfigModel {
    baseURL: string
    apiKey: string
    model: string
}

export interface APIConfigIndex {
    id: number
    name: string
}

export interface APIConfigBackup {
    configs: {
        config: APIConfigModel,
        index: APIConfigIndex,
    }[]
}

export class APIConfigStore {
    id = apiConfig<number>("selectedID")
    idList = apiConfig<APIConfigIndex[]>("index")
    config = apiConfig<APIConfigModel>(0)

    async init() {
        const list = await this.idList.loadValue()
        if (list === undefined) {
            await this.idList.emit([{id: Date.now(), name: ""}])
        }

        let id = await this.id.loadValue()
        if (id === undefined) {
            id = this.idList.lastValue![0].id // have at least one member after idList init
            await this.id.emit(id)
        }

        const config = await this.config.setKey(id)
        if (config === undefined) {
            await this.config.emit({baseURL: "", apiKey: "", model: ""})
        }
    }
}
