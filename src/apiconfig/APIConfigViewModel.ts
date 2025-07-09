import {APIConfigBackup, APIConfigModel, APIConfigStore} from "./Models"
import {apiConfig} from "../db/SharedStorage"
import {getSimpleDriveFile, setSimpleDriveFile} from "../google/SimpleDriveFile"
import {useSharedFlow} from "../db/SharedFlowRef"
import {computed} from "vue";

export class APIConfigViewModel {
    id
    idList
    config
    selectedIndex

    constructor(private store: APIConfigStore, private clientID: string) {
        this.id = useSharedFlow(store.id, 0)
        this.idList = useSharedFlow(store.idList, [], {deep: true})
        this.config = useSharedFlow(store.config, {baseURL: "", apiKey: "", model: ""}, {deep: true})
        this.selectedIndex = computed(() => {
            const found = this.idList.value.find(item => item.id == this.id.value)
            return found || {id: 0, name: ""}
        })
    }

    async saveBackup() {
        const configs = []
        const idList = this.idList.value
        for (const index of idList) {
            const config = await apiConfig<APIConfigModel>(index.id).loadValue()
            if (config !== undefined) {
                configs.push({
                    index: index,
                    config: config
                })
            }
        }
        const backup = {configs: configs}
        await setSimpleDriveFile(this.clientID, "APIConfigs.json", JSON.stringify(backup))
    }

    async loadBackup() {
        const text = (await getSimpleDriveFile(this.clientID, "APIConfigs.json"))!
        const backup: APIConfigBackup = JSON.parse(text)

        const idList = this.idList.value
        for (const item of backup.configs) {
            const existingIndex = idList.findIndex(i => i.id === item.index.id)
            if (existingIndex !== -1) {
                idList[existingIndex] = item.index
            } else {
                idList.push(item.index)
            }
            await apiConfig<APIConfigModel>(item.index.id).emit(item.config)
        }
        this.idList.value = idList
    }

    async addConfig() {
        const newID = Date.now()
        this.idList.value.push({id: newID, name: ""})
        await this.selectConfig(newID)
    }

    async deleteConfig() {
        const deleteID = this.id.value
        await this.store.config.emit(undefined)
        if (this.idList.value.length === 1) {
            await this.addConfig()
        } else {
            const index = this.idList.value.findIndex(item => item.id === deleteID)
            this.id.value = this.idList.value[index - 1].id
            await this.store.config.setKey(this.id.value)
        }
        this.idList.value = this.idList.value.filter(item => item.id !== deleteID)
    }

    async selectConfig(id: number) {
        this.id.value = id
        await this.store.config.setKey(id)
    }
}
