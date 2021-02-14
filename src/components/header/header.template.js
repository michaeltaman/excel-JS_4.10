import {defaultTitle} from "@/constants";

export function createTitle(state = {}) {
    return `
      <input type="text" class="input" value=${JSON.stringify(state.title || defaultTitle)} />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `
}