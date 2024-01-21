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
import ElementPlus from 'element-plus'

// import 'theme-chalk/lib/index.css' // 如何能引到主题样式

import App from './App.vue'

import router from './router/router'

const app = createApp(App)

// app.use(Zui)
app.use(ElementPlus) // TODO: 先可以使用 ElementPlus，慢慢迭代删除

app.use(createPinia())
app.use(router)

app.mount('#app')

listenReceiveMessage()

setupApp()
