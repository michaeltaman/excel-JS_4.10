import {isEqual} from "@core/utils";

export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.sub = null
        this.prevStoreState = {}
    }

    subscribeComponents(components) {
        this.prevStoreState = this.store.getState()
        this.sub = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                if(!isEqual(this.prevStoreState[key], state[key])) {
                    components.forEach(component => {
                        if(component.isWatching(key)) {
                            const changes = {[key]: state[key]}
                            component.storeChanged(changes)
                        }
                    })
                }
            })

            this.prevStoreState = this.store.getState()
        })
    }

    unsibscribeFormStore() {
        this.sub.unsubscribe()
    }
}