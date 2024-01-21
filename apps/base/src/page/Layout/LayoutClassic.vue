<template>
  <!-- 经典布局 -->
  <z-page class="classic_page_container" direction="vertical">
    <Header class="top_wrapper" />
    <!-- <z-header class="top_wrapper">
    logo
  </z-header> -->
    <z-page>
      <!-- 侧边菜单 -->
      <z-aside class="menu_wrapper" :width="isCollapse ? '60px' : '240px'">
        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeMenu"
            :collapse="isCollapse"
            :unique-opened="accordion"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="menuList" @on-menu-click="handleMenuClick" @menu-click="handleMenuClick" v-bind:some="handleMenuClick"/>
          </el-menu>
        </el-scrollbar>
      </z-aside>

      <z-page>
        <!-- tab list -->
        <z-header class="tab_wrapper"> </z-header>

        <!-- 主页面 -->
        <z-content class="main_wrapper" v-loading="microAppLoading">
          <wujie-vue
            v-if="microApp"
            :name="microApp.name"
            :url="microApp.url"
            :props="microAppProps"
            :afterMount="afterMount"
          />
          <router-view v-slot="{ Component }">
            <keep-alive :include="aliveView">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </z-content>
      </z-page>
    </z-page>
  </z-page>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect, watch, toRaw, computed } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import WujieVue from 'wujie-vue3'

import { ZPage, ZHeader, ZContent, ZFooter, ZAside } from '@apps/components'

import { microAppLoading } from '@/wujie-config/microAppLoading'
// import type { Menu } from '@/config/menus'
import { useMenuStore } from '@/stores/menu'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { useGlobalStore } from '@/stores/global'


import Header from './components/Header/index.vue'
import SubMenu from './components/Menu/SubMenu.vue'

const router = useRouter()
const route = useRoute()
const { isCollapse, accordion }  = storeToRefs(useGlobalStore())
const { apps } = storeToRefs(useAppStore())
const { user } = storeToRefs(useUserStore())
const { menuList, flattenMenuList } = useMenuStore()

const activeMenu = ref<string>('') // 当前选中的菜单
// const selectedKeys = ref<number[]>([]) // 当前选中的菜单key
const openKeys = reactive<number[]>([])
const aliveView = reactive<string[]>(['KeepAliveView'])

const microApp = computed(() => {
  const app = apps.value.find((item) => route.path.startsWith(item.activeRule))
  if (app) {
    return {
      ...app,
      url: `${app.url}#${route.fullPath}`
    }
  }
  return null
})
const microData = computed(() => ({
  user: toRaw(user.value)
}))
const microAppProps = computed(() => ({ router }))

const { bus } = WujieVue

function afterMount() {
  if (microApp.value) {
    // 解决首次加载路由跳转地址错误问题
    bus.$emit(`${microApp.value.name}:router-change`, {
      path: route.fullPath,
      replace: true
    })
  }
  bus.$emit('changeUser', toRaw(microData.value))
}

function getParentKeys(menus: Menu.MenuOptions[], key: number, parents: number[]) {
  for (const item of menus) {
    if (key === item.key) {
      return true
    } else if (item.children && item.children.length > 0) {
      parents.push(item.key)
      const hasKey = getParentKeys(item.children, key, parents)
      if (hasKey) return true
      parents.pop()
    }
  }
  return false
}
// 点击菜单
const handleMenuClick =  ({ key, meta }: { key: number, meta: Menu.MetaProps }) => {
  if (meta.isLink) return window.open(meta.isLink, "_blank");

  if (key !== undefined) {
    // selectedKeys.value = [key]
    activeMenu.value = key + ''
    const res = flattenMenuList.find((item) => item.key === key)
    if (res) {
      router.push(res.path!)
    }
  }
}

function initKeys() {
  const { fullPath } = route
  const res = flattenMenuList.find((item) => item.path === fullPath)
  if (res) {
    // selectedKeys.value = [res.key]
    activeMenu.value = res.key + ''
    const parents: number[] = []
    getParentKeys(menuList, res.key, parents)
    openKeys.push(...parents)
  }
}

watchEffect(initKeys)

watch(route, (val) => {
  if (microApp.value) {
    bus.$emit(`${microApp.value.name}:router-change`, {
      path: val.fullPath,
      replace: false
    })
  }
})

</script>

<style lang="scss" scoped>
.classic_page_container {
  width: 100%;
  height: 100%;
  padding: 0;
  .top_wrapper {
    background-color: antiquewhite;
  }
  .menu_wrapper {
    background-color: #ff9;
  }
  .tab_wrapper {
    background-color: #aaa;
  }
  .main_wrapper {
    background-color: #fff;
  }
}
</style>
