<script setup lang="ts">
import SharedFlowDemo from "./SharedFlowDemo.vue";
import {shallowRef} from "vue";
import ApiConfigDemo from "./APIConfigDemo.vue";

const demos = [
    {name: "APIConfigPanel", component: ApiConfigDemo},
    {name: "SharedFlow", component: SharedFlowDemo},
]
const selectedDemo = shallowRef(demos[0])
</script>

<template>
    <v-app>
        <v-navigation-drawer permanent>
            <v-list class="drawer-list">
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
.drawer-list {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.drawer-list > * {
    width: 100%;
}

.main-container {
    height: 100vh;
    overscroll-behavior: auto;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-container > * {
    max-width: 600px;
    width: 100%;
}
</style>
