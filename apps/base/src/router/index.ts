/*
 * @Author: CP
 * @Date: 2024-01-12 14:58:48
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'

import staticRoutes from './static'

console.log('import.meta.env = ', import.meta.env);
const mainIndex = import.meta.env.VITE_MAIN_INDEX_URL

const routes = [
  {
    path: '/',
    redirect: mainIndex
  },
  // {
  //   path: '/layout',
  //   name: 'layout',
  //   redirect: mainIndex
  // },
  // {
  //   path: mainIndex,
  //   name: '首页',
  //   component: () => import('@/views/home/welcome.vue'),
  // },
  ...staticRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
