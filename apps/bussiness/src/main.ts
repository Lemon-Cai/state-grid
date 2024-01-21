/*
 * @Author: CP
 * @Date: 2024-01-15 14:40:20
 * @LastEditors: 
 * @Description: 
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router'

function setup() {
  
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)

  app.mount('#app')

  return app
}

function changeUserListener(e: any) {
  store.dispatch((dispatch) => {
    dispatch(setUser(e.user))
  })
}

function routerChangeListener(e: any) {
  router.navigate(e.path, { replace: e.replace || false })
}


if (window.__POWERED_BY_WUJIE__) {
  let instance
  window.__WUJIE_MOUNT = () => {
    instance = setup()
    window.$wujie?.bus.$on('changeUser', changeUserListener)
    window.$wujie?.bus.$on('viteApp:router-change', routerChangeListener)

  }
  window.__WUJIE_UNMOUNT = () => {
    instance?.unmount()
    window.$wujie?.bus.$off('changeUser', changeUserListener)
    window.$wujie?.bus.$off('viteApp:router-change', routerChangeListener)
  }
  
  window.__WUJIE.mount()
} else {
  setup()
}
