<script setup lang="ts">
import {ref} from "vue";
import {VBtn, VCard, VCardActions, VCardText, VDialog} from 'vuetify/components'
import APIConfigPanel from "./APIConfigPanel.vue";

const showDialog = ref(false)
</script>

<template>
    <v-dialog
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
                <APIConfigPanel/>
            </v-card-text>

            <v-card-actions>
                <v-btn class="text-none w-100" text="Done" @click="showDialog=false"/>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
