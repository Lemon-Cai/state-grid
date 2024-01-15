/*
 * @Author: CP
 * @Date: 2024-01-15 16:22:21
 * @Description: 
 */
import type { App } from 'vue'

import Page from './src/page.vue'


export default Object.assign(Page, {
  install: function (app: App) {
    app.component(Page.name, Page);
  }
})
