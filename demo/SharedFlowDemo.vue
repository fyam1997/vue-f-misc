<script setup lang="ts">
import {SharedFlow, useSharedFlow} from "../src";
import {computed} from "vue";

type TestType = { name: { firstname: string, lastname: string } }
const sharedFlow = new SharedFlow<TestType>()
const demoSharedFlow = useSharedFlow(
    sharedFlow,
    {name: {firstname: '', lastname: ''}},
    {deep: true},
)
const fullText = computed(() => JSON.stringify(demoSharedFlow.value))
</script>

<template>
    <div>
        <h3>Shared Flow</h3>
        <div>{{ fullText }}</div>
        <v-text-field v-model="demoSharedFlow.name.firstname"/>
        <v-text-field v-model="demoSharedFlow.name.lastname"/>
    </div>
</template>
