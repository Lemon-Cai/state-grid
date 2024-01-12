/*
 * @Author: CP
 * @Date: 2024-01-10 16:52:42
 * @Description: 
 */
// import { ElButton as Button } from "element-plus";


// export default Button

import type { App } from 'vue'

import Button from './button.vue'


export default Object.assign(Button, {
  install: function (app: App) {
    app.component(Button.name, Button);
  }
})