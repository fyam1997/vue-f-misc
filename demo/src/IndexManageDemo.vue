<script setup lang="ts">
import {computed, onMounted, provide, ref, watch} from "vue"
import {VCard} from 'vuetify/components'
import {APIConfigStore, IndexManageDialog, IndexManagePanel, useSharedFlow} from "vue-f-misc"

const store = new APIConfigStore("")
provide(APIConfigStore.KEY, store)
onMounted(() => store.init())

const googleID = ref("")
watch(googleID, id => store.googleClientID = id)

const idList = useSharedFlow(store.idList, [], {deep: true})
const listText = computed(() => idList.value.map(item => item.name).join(", "))
const titleEditable = ref(true)
</script>

<template>
    <div class="d-flex flex-column justify-center align-center">
        <v-text-field style="max-width: 600px; width: 100%" v-model="googleID" label="Google Client ID"/>
        <div>{{ listText }}</div>
        <v-switch v-model="titleEditable" label="Title Editable"/>
        <IndexManageDialog
            :list="idList"
            titleProp="name"
            :titleEditable="titleEditable"
        />
        <br>
        <v-card variant="outlined" style="max-width: 600px; width: 100%;padding: 1rem;resize: both;">
            <IndexManagePanel
                :list="idList"
                titleProp="name"
                :titleEditable="titleEditable"
            />
        </v-card>
    </div>
</template>
