<script setup lang="ts">
import Sortable from "sortablejs"
import { useTemplateRef, watch } from "vue"

export interface IndexManagePanelProps {
    list: Array<any>
    titleReadonly?: boolean // default false
    idProp?: string // default 'id'
    titleProp?: string // default 'name'
}

const props = defineProps<IndexManagePanelProps>()
const itemsRef = useTemplateRef("items")

watch(itemsRef, (element) => {
    if (!element) return
    Sortable.create(element, {
        animation: 200,
        handle: ".handle",
        onEnd: (evt) => {
            if (evt.oldIndex !== undefined && evt.newIndex !== undefined) {
                const movedItem = props.list.splice(evt.oldIndex, 1)[0]
                props.list.splice(evt.newIndex, 0, movedItem)
            }
        },
    })
})
</script>

<template>
    <div ref="items">
        <div
            v-for="item in props.list"
            class="d-flex flex-row align-center pt-2"
            :key="item[props.idProp ?? 'id']"
        >
            <v-icon-btn class="handle" icon="md:drag_handle" variant="plain" />
            <VTextField
                class="pr-6"
                v-model="item[props.titleProp ?? 'name']"
                hide-details
                :readonly="props.titleReadonly"
            />
        </div>
    </div>
</template>
<style scoped>
.handle {
    cursor: grab;
}
</style>
