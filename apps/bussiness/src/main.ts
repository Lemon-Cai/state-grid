import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


// if (window.__POWERED_BY_WUJIE__) {
//   let instance;
//   window.__WUJIE_MOUNT = () => {
//     const router = createRouter({ history: createWebHistory(), routes });
//     instance = createApp(App);
//     instance.use(router);
//     instance.mount("#app");
//   };
//   window.__WUJIE_UNMOUNT = () => {
//     instance.unmount();
//   };
// } else {
//   createApp(App).use(createRouter({ history: createWebHistory(), routes })).mount("#app");
// }


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
