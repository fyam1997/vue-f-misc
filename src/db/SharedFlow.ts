export type FlowCollector<T> = (value: T) => void

export class SharedFlow<T> {
    private collectors: FlowCollector<T>[] = []
    lastValue?: T | undefined

    async emit(newValue: T) {
        this.lastValue = newValue
        this.collectors.forEach(observer => observer(newValue))
    }

    collect(collector: FlowCollector<T>) {
        this.collectors.push(collector)
    }

    removeObserver(collector: FlowCollector<T>) {
        this.collectors = this.collectors.filter(item => item !== collector)
    }
}
