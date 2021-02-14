import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula_id')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value) // data-value attribute
    })

    /*
     this.$subscribe(state => {
       console.log('Formula update ', state.currentText)
       this.$formula.text(state.currentText)
     })*/
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula_id" class="input" contenteditable spellcheck="false"></div>
    `
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }



  onInput(event) {
    console.log($(event.target))
    const text =  $(event.target).text()
    this.$emit('formula:input', text)
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if(keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done')
    }
  }
}
