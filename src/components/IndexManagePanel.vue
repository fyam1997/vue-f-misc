<script setup lang="ts">
import Sortable from 'sortablejs'
import {useTemplateRef, watch} from "vue"
import {APIConfigViewModel} from "../apiconfig/APIConfigViewModel"

const viewModel = APIConfigViewModel.injectOrCreate()
const idList = viewModel.idList
const itemsRef = useTemplateRef('items')

watch(itemsRef, element => {
    if (!element) return
    Sortable.create(
        element,
        {
            animation: 200,
            handle: '.handle',
            onEnd: (evt) => {
                if (evt.oldIndex !== undefined && evt.newIndex !== undefined) {
                    const movedItem = idList.value.splice(evt.oldIndex, 1)[0]
                    idList.value.splice(evt.newIndex, 0, movedItem)
                }
            },
        },
    )
})
</script>

<template>
    <div ref="items">
        <div
            v-for="item in idList"
            class="d-flex flex-row align-center pt-2"
            :key="item.id"
        >
            <v-icon-btn
                class="handle"
                icon="md:drag_handle"
                variant="plain"
            />
            <VTextField
                class="pr-6"
                v-model="item.name"
                hide-details
            />
        </div>
    </div>
</template>
<style scoped>
.handle {
    cursor: grab;
}
</style>
