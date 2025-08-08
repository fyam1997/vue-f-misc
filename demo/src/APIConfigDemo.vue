<script setup lang="ts">
import { onMounted, provide, ref, watch } from "vue"
import { APIConfigDialog, APIConfigPanel, APIConfigStore } from "vue-f-misc"

const store = new APIConfigStore("")
provide(APIConfigStore.KEY, store)
onMounted(() => store.init())

const googleID = ref("")
watch(googleID, (id) => (store.googleClientID = id))
</script>

<template>
    <div class="d-flex flex-column justify-center align-center">
        <v-text-field
            style="max-width: 600px; width: 100%"
            v-model="googleID"
            label="Google Client ID"
        />
        <APIConfigDialog />
        <br />
        <v-card
            variant="outlined"
            style="max-width: 600px; width: 100%; padding: 1rem; resize: both"
        >
            <APIConfigPanel />
        </v-card>
    </div>
</template>
