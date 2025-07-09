import {SharedFlow} from "./SharedFlow";
import {WatchOptions} from "@vue/runtime-core";
import {ref, toRaw, watch} from "vue";

export function useSharedFlow<T>(
    sharedFlow: SharedFlow<T | undefined>,
    defaultValue: T,
    options?: WatchOptions,
) {
    const vueRef = ref<T>(defaultValue)
    sharedFlow.collect(value => {
        if (value === undefined) {
            vueRef.value = defaultValue
        } else {
            vueRef.value = value
        }
    })
    watch(vueRef, async (value) => {
        const rawValue = toRaw(value)
        await sharedFlow.emit(rawValue)
    }, options)
    return vueRef
}
