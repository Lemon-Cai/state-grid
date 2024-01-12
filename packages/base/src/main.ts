/*
 * @Author: CP
 * @Date: 2024-01-12 14:58:48
 * @Description: 
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(components)

app.use(createPinia())
app.use(router)

app.mount('#app')
