<script setup lang="ts">
import {APIConfigViewModel} from "../apiconfig/APIConfigViewModel";
import {APIConfigStore} from "../apiconfig/Models";
import {VBtn, VCombobox, VTextField} from 'vuetify/components'

const props = defineProps({
    store: {type: APIConfigStore, required: true},
    clientID: {type: String, required: true},
})
const viewModel = new APIConfigViewModel(props.store, props.clientID)
const apiConfig = viewModel.config
const idList = viewModel.idList
const selectedIndex = viewModel.selectedIndex

function onIndexSelected(value: any) {
    if (value && typeof value === "object" && "id" in value) {
        viewModel.selectConfig(value.id)
    }
}
</script>

<template>
    <div class="d-flex flex-column ga-4">
        <div class="w-100 d-flex flex-row flex-wrap">
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
            <v-spacer/>
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
        <v-combobox
            variant="outlined"
            :model-value="selectedIndex"
            :items="idList"
            item-title="name"
            item-value="id"
            @update:model-value="onIndexSelected"
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