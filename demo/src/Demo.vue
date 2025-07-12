<script setup lang="ts">
import SharedFlowDemo from "./SharedFlowDemo.vue"
import {computed, ref, shallowRef} from "vue"
import ApiConfigDemo from "./APIConfigDemo.vue"
import IndexManageDemo from "./IndexManageDemo.vue"
import {useWindowSize} from "@vueuse/core"
import {VList, VListItem, VMain} from 'vuetify/components'

const demos = [
    {name: "APIConfigPanel", component: ApiConfigDemo},
    {name: "IndexManage", component: IndexManageDemo},
    {name: "SharedFlow", component: SharedFlowDemo},
]
const selectedDemo = shallowRef(demos[0])
const screenWidth = useWindowSize().width
const largeScreen = computed(() => screenWidth.value >= 950)
const drawer = ref(largeScreen.value)
</script>

<template>
    <v-app class="h-100">
        <v-btn
            icon="md:menu"
            @click="drawer = !drawer"
            style="position: fixed; top: 16px; left: 16px; z-index: 2000;"
        />
        <v-navigation-drawer v-model="drawer" :permanent="largeScreen">
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: safe center;
    align-items: safe center;
    overflow: auto;
}

.drawer-list > * {
    width: 100%;
}

.main-container {
    height: 100%;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}

.main-container > * {
    max-width: 600px;
    width: 100%;
}
</style>
