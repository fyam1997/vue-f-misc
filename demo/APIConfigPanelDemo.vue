<script setup lang="ts">
import {APIConfigStore} from "../src";
import APIConfigPanel from "../src/components/APIConfigPanel.vue";
import {onMounted} from "vue";

const store = new APIConfigStore()

onMounted(() => store.init())
</script>

<template>
    <div>
        <APIConfigPanel client-i-d="" :store="store"/>
    </div>
</template>
