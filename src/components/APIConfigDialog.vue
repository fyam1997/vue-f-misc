<script setup lang="ts">
import {ref} from "vue";
import {VBtn, VCard, VCardActions, VCardText, VDialog} from 'vuetify/components'
import APIConfigPanel from "./APIConfigPanel.vue";
import {APIConfigStore} from "../apiconfig/Models";

defineProps({
    expanded: {type: Boolean, default: false},
    store: {type: APIConfigStore, required: true},
    clientID: {type: String, required: true},
})
const showDialog = ref(false)
</script>

<template>
    <v-dialog
        v-if="!expanded"
        max-width="600"
        scroll-strategy="none"
        v-model="showDialog"
        scrollable
    >
        <template v-slot:activator>
            <v-btn
                class="text-none"
                prepend-icon="md:settings"
                variant="outlined"
                @click="showDialog=true"
                text="Config API"
            />
        </template>

        <v-card>
            <v-card-text class="flex-grow-1">
                <APIConfigPanel :store="store" :clientID="clientID"/>
            </v-card-text>

            <v-card-actions>
                <v-btn class="text-none w-100" text="Done" @click="showDialog=false"/>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <APIConfigPanel v-else :store="store" :clientID="clientID"/>
</template>

<style scoped>

</style>