export type Listener = (data?: any) => void;

export default class EventEmitter {
    private _events: {[key: string]: Listener[]} = {};

    on(name: string, listener: Listener) {
        if (!this._events[name]) {
            this._events[name] = [];
        }

        this._events[name].push(listener);
    }

    removeListener(name: string, listenerToRemove: Listener) {
        if (!this._events[name]) {
            throw new Error(`Cannot remove a listener. Event "${name}" does not exist.`);
        }

        const filterListeners = (listener: Listener) => listener !== listenerToRemove;

        this._events[name] = this._events[name].filter(filterListeners);
    }

    emit(name: string, data?: any) {
        if (!this._events[name]) {
            throw new Error(`Cannot emit an event. Event "${name}" does not exist.`);
        }

        const fireCallbacks = (callback: Listener) => {
            callback(data);
        };

        this._events[name].forEach(fireCallbacks);
    }
}
