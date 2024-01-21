/*
 * @Author: CP
 * @Date: 2024-01-15 15:32:42
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { menuList as menu } from '@/config/menus'
// import type { Menu } from '@/config/menus'
import router from '@/router/router'

const globs = import.meta.glob('../views/**/*.vue') // TODO: import.meta.glob('../views/**/*.vue')
const pageGlobs = import.meta.glob('../page/**/index.vue')

// menu转Routes
function transformRoutes(menus: Menu.MenuOptions[], parentPath = ''): RouteRecordRaw[] {
  const res: RouteRecordRaw[] = []
  for (const item of menus) {
    const { path, component, key, children } = item
    const routeItem: RouteRecordRaw = {
      name: key + '',
      path: '',
      children: []
    }
    // 处理一级路由
    if (!parentPath && (!children || children?.length === 0)) {
      routeItem.name = `top${item.key}`
      routeItem.component = () => import('@/page/Layout/index.vue')
      routeItem.path = ''
      routeItem.children = [ {
        name: item.key + '',
        path: `/${item.path}`
      } as RouteRecordRaw ]
      if (component === "Layout") {
        // 框架布局
        routeItem.component = pageGlobs[`../page/${component}/index.vue`]
      } else if (component) {
        // 页面
        routeItem.component = globs[`../views/${component}.vue`]
      }
      res.push(routeItem)
      continue
    }
    routeItem.path = parentPath + '/' + path
    if (component === "Layout") {
      // 框架布局
      routeItem.component = pageGlobs[`../page/${component}/index.vue`]
    } else if (component) {
      // 页面
      routeItem.component = globs[`../views/${component}`]
    }
    if (children) {
      routeItem.children = transformRoutes(children, routeItem.path)
    }
    res.push(routeItem)
  }
  return res
}

// 组合menu完整path
function combineMenuPath(menus: Menu.MenuOptions[], parentPath = ''): Menu.MenuOptions[] {
  return menus.map((item) => {
    const path = `${parentPath}/${item.path}`
    if (item.children) {
      return {
        ...item,
        path,
        children: combineMenuPath(item.children, path)
      }
    }
    return { ...item, path }
  })
}

function flatMenu(menu: Menu.MenuOptions[]): Menu.MenuOptions[] {
  return menu.reduce((res, cur) => {
    if (cur.children && cur.children.length > 0 ) {
      res.push(...flatMenu(cur.children))
    }
    res.push(cur)
    return res
  }, [] as Menu.MenuOptions[])
}

export const useMenuStore = defineStore('menu', () => {
  const menuList = reactive<Menu.MenuOptions[]>(combineMenuPath(menu))
  const flattenMenuList = reactive<Menu.MenuOptions[]>(flatMenu(menuList))

  const addRoutes = () => {
    transformRoutes(menu).forEach(item => router.addRoute(item))
  }

  return { menuList, addRoutes, flattenMenuList }
})
