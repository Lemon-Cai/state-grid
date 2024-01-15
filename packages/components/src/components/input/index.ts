/*
 * @Author: CP
 * @Date: 2024-01-12 15:53:00
 * @Description: 
 */

import type { App } from 'vue'

import Input from './input.vue'


export default Object.assign(Input, {
  install: function (app: App) {
    app.component(Input.name, Input);
  }
})

// export default Input