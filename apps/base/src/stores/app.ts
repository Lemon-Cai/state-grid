import { defineStore } from 'pinia'
import { apps as microApps } from '@/config/apps'
import { computed, reactive } from 'vue'
import type { MicroApp } from '@/config/apps'

export const useAppStore = defineStore('appStore', () => {
  const apps = reactive<MicroApp[]>(microApps)
  const paths = computed(() => apps.map(item => item.activeRule))
  return { apps, paths }
})
