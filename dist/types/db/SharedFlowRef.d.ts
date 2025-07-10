import { SharedFlow } from './SharedFlow';
import { Ref, WatchOptions } from 'vue';
export declare function useSharedFlow<T>(sharedFlow: SharedFlow<T | undefined>, defaultValue: T, options?: WatchOptions): Ref<T>;
