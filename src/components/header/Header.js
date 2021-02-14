import {ExcelComponent} from '@core/ExcelComponent'
import {$} from "@core/dom";
import {createTitle} from "@/components/header/header.template";
import {debounce} from "@core/utils";
import {changeTitle} from "@/redux/actions";

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    return createTitle(this.store.getState())
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle(
      $target.text()
    ))
  }
}
