/*
 * @Author: CP
 * @Date: 2024-01-15 15:34:07
 * @Description: 全站权限配置
 */

import { useMenuStore } from '@/stores/menu'
import { useUserStore } from '@/stores/user'
import { user as userData } from '@/config/userData'
import { setMicroAppLoading } from '@/wujie-config/microAppLoading'
import NProgress from "@/config/nprogress";
import { APP_TITLE, LOGIN_URL } from '@/config/constants'
import router from '.'

// import store from '@/stores'

// import { validatenull, getToken } from '@/utils'
// import { skipLogin } from '@/api/user'
// import config from '@/config/website'

// NProgress.configure({ showSpinner: false })
// const lockPage = store.getters.website.lockPage //锁屏页


// router.beforeEach((to, from, next) => {
//   const tempFlagFunc = (call) => {
//     const url = location.href // xxxx?skipLogin
//     if (url.includes('?') && url.includes('skipLogin')) {
//       // 跳转的逻辑
//       skipLogin().then(({ data }) => {
//         const tData = JSON.parse(data.data)
//         localStorage.setItem('isLayout', url.includes('zhxj') ? 2 : url.includes('qsmzq') && 1)
//         this.$store.dispatch('SetLayoutData', url.includes('zhxj') ? 2 : url.includes('qsmzq') && 1)
//         if (tData.error_description) {
//           // console.log('error!')
//         } else {
//           store.commit('SET_TOKEN', tData.access_token)
//           store.commit('SET_REFRESH_TOKEN', tData.refresh_token)
//           store.commit('SET_TENANT_ID', tData.tenant_id)
//           store.commit('SET_USER_INFO', tData)
//           store.commit('DEL_ALL_TAG')
//           store.commit('CLEAR_LOCK')
//           next({ path: '/' })
//           // console.log('ok!')
//         }
//       })
//     } else {
//       call && call() // 正常逻辑，走login
//     }
//   }

//   const meta = to.meta || {}
//   const isMenu = meta.menu === undefined ? to.query.menu : meta.menu
//   store.commit('SET_IS_MENU', isMenu === undefined)
//   if (getToken()) {
//     if (store.getters.isLock && to.path !== lockPage) {
//       //如果系统激活锁屏，全部跳转到锁屏页
//       next({ path: lockPage })
//     } else if (to.path === config.defaultLogin) {
//       if (config.defaultLogin == '/qsmzq') {
//         const l = localStorage.getItem('isLayout')
//         next({ path: l == 1 ? '/page/index' : '/uavControl/top/index' })
//       } else {
//         //如果登录成功访问登录页跳转到主页
//         next({ path: config.defaultLogin })
//       }
//     } else if (to.path === config.login) {
//       if (config.login == '/zhxj') {
//         const l = localStorage.getItem('isLayout')
//         next({ path: l == 1 ? '/page/index' : '/uavControl/top/index' })
//       } else {
//         //如果登录成功访问登录页跳转到主页
//         next({ path: config.login })
//       }
//     } else if (to.path === '/') {
//       //如果登录成功访问登录页跳转到主页
//       next({ path: '/402' })
//     } else {
//       //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
//       if (store.getters.token.length === 0) {
//         store.dispatch('FedLogOut').then(() => {
//           tempFlagFunc(() => {
//             next({ path: '/' })
//           })
//         })
//       } else {
//         const value = to.query.src || to.fullPath
//         const label = to.query.name || to.name
//         const meta = to.meta || router.$avueRouter.meta || {}
//         const i18n = to.query.i18n || ''
//         if (to.query.target) {
//           window.open(value)
//         } else if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
//           if (label != '首页' && Object.keys({ ...to.params, ...to.query }).length) {
//             store.commit('ADD_TAG', {
//               label: label,
//               value: value,
//               params: to.params,
//               query: localStorage.getItem('isLayout') == 2 ? to.params : to.query, //全业务切换路由调整
//               meta: (() => {
//                 if (!i18n) {
//                   return meta
//                 }
//                 return {
//                   i18n: i18n
//                 }
//               })(),
//               group: router.$avueRouter.group || []
//             })
//           }
//         }
//         next()
//       }
//     }
//   } else {
//     //判断是否需要认证，没有登录访问去登录页
//     if (meta.isAuth === false) {
//       next()
//     } else {
//       tempFlagFunc(() => {
//         next({ path: '/402' })
//       })
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done()
//   let title = store.getters.tag.label
//   let i18n = store.getters.tag.meta.i18n
//   title = router.$avueRouter.generateTitle(title, i18n)
//   //判断登录页的情况
//   if (router.history.current.fullPath === '/login') {
//     title = '登录'
//   }
//   //根据当前的标签也获取label的值动态设置浏览器标题
//   router.$avueRouter.setTitle(title)
// })



// 是否已经加载初始化的数据

let loadedInitData = false

router.beforeEach(async (to, from, next) => {
  const { addRoutes } = useMenuStore()
  const { setUser, token } = useUserStore()

  // 1.NProgress 开始
  NProgress.start();
  setMicroAppLoading(true)
  
  // 2.动态设置标题
  document.title = to.meta.title ? `${to.meta.title} - ${APP_TITLE}` : APP_TITLE;

  
  // // 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  // if (to.path.toLocaleLowerCase() === LOGIN_URL) {
  //   if (token) return next(from.fullPath);
  //   resetRouter();
  //   return next();
  // }

  // // 5.判断是否有 Token，没有重定向到 login 页面
  // if (!token) return next({ path: LOGIN_URL, replace: true });


  // 6：loadedInitData = true 即初始化完成，否则初始化
  if (!loadedInitData) {
    // 模拟，初始化用户
    setUser(userData)
    // 动态添加路由
    addRoutes()
    loadedInitData = true
    next(to)
  } else {
    next()
  }
})

router.afterEach(async () => {
  NProgress.done()
  setMicroAppLoading(false)
})

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
  const menuStore = useMenuStore();
  menuStore.flattenMenuList.forEach(route => {
    const { name } = route;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};

export default router