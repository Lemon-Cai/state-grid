
import type { App } from 'vue'

import Input from './input.vue'


export default Object.assign(Input, {
  install: function (app: App) {
    app.component(Input.name, Input);
  }
})