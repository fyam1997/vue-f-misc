<script setup lang="ts">
import {
    VBtn,
    VCard,
    VCardActions,
    VCardText,
    VDialog,
} from "vuetify/components"
import { ref } from "vue"
import IndexManagePanel, { IndexManagePanelProps } from "./IndexManagePanel.vue"

const props = defineProps<IndexManagePanelProps>()
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
                icon="md:edit"
                variant="plain"
                @click="showDialog = true"
                title="Manage Configs"
            />
        </template>

        <v-card>
            <v-card-text class="flex-grow-1">
                <IndexManagePanel v-bind="props" />
            </v-card-text>

            <v-card-actions>
                <v-btn
                    class="text-none w-100"
                    text="Done"
                    @click="showDialog = false"
                />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
