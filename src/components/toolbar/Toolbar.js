import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import * as actions from "@/redux/actions";
/////import {initialToolbarState} from "@/redux/types";
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  init() {
    super.init()

    this.$on('table:select', $cell => {
      this.selectedID = $cell.data.id
      //console.log(this.selectedID)
    })

  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    //console.log("CHANGES: ", changes)
    this.setState(changes.currentStyles)
  }

  updateToolbarInStore(key, value) {
    this.$dispatch(actions.changeToolbar({
      cell: this.selectedID,
      id: key,
      value
    }))
  }

  onClick(event) {
    const $target = $(event.target)
    if($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)// to get the object
      this.$emit('toolbar: applyStyle', value)
    }
  }
}
