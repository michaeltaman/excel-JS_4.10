// export function createStore(rootReducer, initialState = {}) {
//     let state = rootReducer({...initialState}, {type: '__INIT__'})
//     let listeners = []
//
//     return {
//         subscribe(fn) {
//             listeners.push(fn)
//             return {
//                 unsubscribe() {
//                     listeners = listeners.filter(l => l !== fn)
//                 }
//             }
//         },
//         //analog emit
//         dispatch(action) {
//             state = rootReducer(state, action)
//             listeners.forEach(listener => listener(state))
//         },
//         getState() {
//             return state
//         }
//     }
// }


export class Store {
    constructor(rootReducer, initialState) {
        this.listeners = []
        this.rootReducer = rootReducer
        this.state = this.rootReducer({...initialState}, {type: '__INIT__'})
    }

    dispatch(action) {
        if(!Array.isArray(this.listeners)){
            return false;
        }

        this.state = this.rootReducer(this.state, action)
        this.listeners.forEach(l => l(this.state))

        return true
    }

    subscribe(fn) {
        this.listeners.push(fn)
             return {
                 unsubscribe() {
                     this.listeners = this.listeners.filter(l => l !== fn)
                 }
             }
    }

    getState() {
        //CAUTION !!!! Do not use too much complicated datastructs
        // for state overerwise object comparison will not work
        return JSON.parse(JSON.stringify(this.state))
    }
}
