<script setup lang="ts">
import SharedFlowDemo from "./SharedFlowDemo.vue";
import {shallowRef} from "vue";
import APIConfigPanelDemo from "./APIConfigPanelDemo.vue";
import APIConfigDialogDemo from "./APIConfigDialogDemo.vue"

const demos = [
    {name: "APIConfigPanel", component: APIConfigPanelDemo},
    {name: "SharedFlow", component: SharedFlowDemo},
    {name: "APIConfigDialog", component: APIConfigDialogDemo},
]
const selectedDemo = shallowRef(demos[0])
</script>

<template>
    <v-app>
        <v-navigation-drawer permanent>
            <v-list>
                <v-list-item
                    v-for="demo in demos"
                    :key="demo.name"
                    :value="demo.name"
                    :title="demo.name"
                    :active="selectedDemo.name === demo.name"
                    @click="selectedDemo = demo"
                />
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <div class="main-container">
                <component :is="selectedDemo.component"/>
            </div>
        </v-main>
    </v-app>

</template>

<style scoped>
.main-container {
    height: 100vh;
    overscroll-behavior: auto;
    padding-left: 16px;
}

.main-container > * {
    max-width: 600px;
    width: 100%;
}
</style>
