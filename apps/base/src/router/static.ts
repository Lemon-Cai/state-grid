/*
 * @Author: CP
 * @Date: 2024-01-17 14:59:50
 * @LastEditors: 
 * @Description: 静态路由
 */


const staticRoutes = [
  {
    path: '/login',
    name: '登录页',
    component: () => import('@/page/login/login.vue'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/lock',
    name: '锁屏页',
    component: () => import('@/page/lock/index.vue'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/404',
    component: () => import('@/page/errorPage/404.vue'),
    name: '404',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "page" */ '@/page/errorPage/403.vue'),
    name: '403',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/402',
    component: () => import(/* webpackChunkName: "page" */ '@/page/errorPage/402.vue'),
    name: '402',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/500',
    component: () => import(/* webpackChunkName: "page" */ '@/page/errorPage/500.vue'),
    name: '500',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/page/errorPage/404.vue'),
  }
]

export default staticRoutes