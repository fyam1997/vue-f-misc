<script setup lang="ts">
import {APIConfigStore} from "../src";
import {onMounted} from "vue";
import APIConfigDialog from "../src/components/APIConfigDialog.vue"

const store = new APIConfigStore()

onMounted(() => store.init())
</script>

<template>
    <div>
        <APIConfigDialog client-i-d="" :store="store"/>
    </div>
</template>
