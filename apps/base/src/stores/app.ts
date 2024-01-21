/*
 * @Author: CP
 * @Date: 2024-01-15 15:29:12
 * @LastEditors: Please set LastEditors
 * @Description:
 */
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { apps as microApps } from '@/config/apps'
import type { MicroApp } from '@/config/apps'

export const useAppStore = defineStore('appStore', () => {
  const apps = reactive<MicroApp[]>(microApps)
  const paths = computed(() => apps.map((item) => item.activeRule))
  return { apps, paths }
})

// 等于, 类似于 vuex 用法

// export const useAppStore2 = defineStore('appStore2', {
//   state: () => ({

//   }),
//   getters: {},
//   actions: {},
// })