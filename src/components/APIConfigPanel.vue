<script setup lang="ts">
import {APIConfigViewModel} from "../apiconfig/APIConfigViewModel";
import {APIConfigIndex, APIConfigStore} from "../apiconfig/Models";
import {VBtn, VSelect, VTextField} from 'vuetify/components'

const props = defineProps({
    store: {type: APIConfigStore, required: true},
    clientID: {type: String, required: true},
})
const viewModel = new APIConfigViewModel(props.store, props.clientID)
const apiConfig = viewModel.config
const idList = viewModel.idList
const selectedIndex = viewModel.selectedIndex

function indexItemProps(item: APIConfigIndex) {
    let name = item.name
    if (!name) {
        name = "No name"
    }
    return {title: name}
}
</script>

<template>
    <div class="d-flex flex-column ga-4">
        <div class="d-flex flex-row align-self-end">
            <v-btn
                icon="md:backup"
                variant="plain"
                @click="viewModel.saveBackup()"
                title="Upload to drive"
            />
            <v-btn
                icon="md:cloud_download"
                variant="plain"
                @click="viewModel.loadBackup()"
                title="Download from drive"
            />
            <v-btn
                icon="md:note_add"
                variant="plain"
                @click="viewModel.addConfig()"
                title="Add config"
            />
            <v-btn
                icon="md:delete"
                variant="plain"
                @click="viewModel.deleteConfig()"
                title="Delete config"
            />
        </div>
        <v-select
            variant="outlined"
            :model-value="selectedIndex"
            :items="idList"
            :item-props="indexItemProps"
            @update:model-value="index=>viewModel.selectConfig(index.id)"
            hide-details
        />
        <v-text-field
            variant="outlined"
            label="Config name"
            v-model="selectedIndex.name"
            class="flex-grow-0"
            hide-details
        />
        <v-text-field
            variant="outlined"
            label="BaseURL"
            v-model="apiConfig.baseURL"
            class="flex-grow-0"
            hide-details
        />
        <v-text-field
            variant="outlined"
            label="ApiKey"
            type="password"
            v-model="apiConfig.apiKey"
            class="flex-grow-0"
            hide-details
        />
        <v-text-field
            variant="outlined"
            label="Model"
            v-model="apiConfig.model"
            class="flex-grow-0"
            hide-details
        />
    </div>
</template>

<style scoped>

</style>