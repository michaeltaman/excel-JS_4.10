import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter

    this.unsubscribers = []
    this.prepare()
  }

  // Configuring the component before initialization
  prepare() {}

  //Method name begins from "$" - will be means that
  // it's relates to our framework (before indication only)
  // Notifies listeners about event happens
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  //Subscribing on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  //Initialization of the component
  //Adding DOM listeners
  init() {
    this.initDOMListeners()
  }

  // Removing the component
  // Cleaning DOM listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }

}
