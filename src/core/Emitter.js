export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // Synonyms: dispatch, fire, trigger - Subscribers notification method
    // Example: table.emit('table:select', {a:1, b:2})
    emit(event, ...args) {
        if(!Array.isArray(this.listeners[event])){
            return false;
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
            // launching corresponded to the event -> function fn(...args)
            // for all customers subscribed this event-type
        })
        return true
    }

    //on, listen
    //Add new subscriber for notification
    //Add new listener
    //Example: formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        // returns - is the function produces inscribing
        // (it really works, see examples at the this file bottom)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

// Example usage of emitter:
// Before test running, remove key-word export from "export class Emitter", right-click
// on the Emitter.js into project-explorer end when choice Run as for single file-running

// const emitter = new Emitter()
// const unsub_vladilen = emitter.subscribe('vladilen', data => {console.log("Sub: ", data)})
//
// setTimeout(() => {
//     emitter.emit('vladilen', ['After 2 sec'])
// }, 2000)
//
// emitter.subscribe('12345', data => {console.log("Sub: ", data)})
//
// setTimeout(() => {
//     unsub_vladilen()
// }, 3000)
//
// setTimeout(() => {
//     emitter.emit('vladilen', ['After 4 sec'])
// }, 4000)
//
// emitter.emit('12345', [42, 23])