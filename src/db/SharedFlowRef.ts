import {SharedFlow} from "./SharedFlow";
import {Ref, ref, toRaw, watch, WatchOptions} from "vue";

export function useSharedFlow<T>(
    sharedFlow: SharedFlow<T | undefined>,
    defaultValue: T,
    options?: WatchOptions,
): Ref<T> {
    // not using ref(defaultValue) to solve type warning
    const vueRef = ref()
    vueRef.value = defaultValue
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
