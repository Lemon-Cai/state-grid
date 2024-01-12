/*
 * @Author: CP
 * @Date: 2024-01-09 15:05:40
 * @Description: 
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import Zui from '@apps/ui'
// import '@apps/ui/lib/style.css'
// import '@apps/ui/es/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Zui)

app.use(createPinia())
app.use(router)

app.mount('#app')
