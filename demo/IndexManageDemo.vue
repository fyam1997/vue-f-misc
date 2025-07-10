<script setup lang="ts">
import {APIConfigStore, useSharedFlow} from "../src";
import {computed, onMounted, provide, ref, watch} from "vue";
import IndexManagePanel from "../src/components/IndexManagePanel.vue"
import IndexManageDialog from "../src/components/IndexManageDialog.vue"
import {VCard} from 'vuetify/components'

const store = new APIConfigStore("")
provide(APIConfigStore.KEY, store)
onMounted(() => store.init())

const googleID = ref("")
watch(googleID, id => store.googleClientID = id)

const idList = useSharedFlow(store.idList, [])
const listText = computed(()=> idList.value.map(item => item.name).join(", "))
</script>

<template>
    <div class="d-flex flex-column justify-center align-center">
        <v-text-field style="max-width: 600px; width: 100%" v-model="googleID" label="Google Client ID"/>
        <div>{{ listText}}</div>
        <IndexManageDialog/>
        <br>
        <v-card variant="outlined" style="max-width: 600px; width: 100%;padding: 1rem;">
            <IndexManagePanel/>
        </v-card>
    </div>
</template>
