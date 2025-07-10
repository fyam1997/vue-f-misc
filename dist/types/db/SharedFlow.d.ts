export type FlowCollector<T> = (value: T) => void;
export declare class SharedFlow<T> {
    private collectors;
    lastValue?: T | undefined;
    emit(newValue: T): Promise<void>;
    collect(collector: FlowCollector<T>): void;
    removeObserver(collector: FlowCollector<T>): void;
}
