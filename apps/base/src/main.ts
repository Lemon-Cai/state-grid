/*
 * @Author: CP
 * @Date: 2024-01-12 14:58:48
 * @Description: 
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { listenReceiveMessage } from '@/wujie-config/messageListener'
import { setupApp } from '@/wujie-config/setupApp'

import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(Zui)

app.use(createPinia())
app.use(router)

app.mount('#app')

listenReceiveMessage()

setupApp()
