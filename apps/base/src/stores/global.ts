import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

import { DEFAULT_PRIMARY } from '@/config/constants'


export const useGlobalStore = defineStore('globalStore', () => {
  const global = reactive({
    // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
    layout: "classic",
    // 折叠菜单
    isCollapse: false,
    // 主题颜色
    primary: DEFAULT_PRIMARY,
    // theme: '' // 主题
    // 菜单手风琴, 是否只保持一个子菜单的展开
    accordion: true,
  })

  return { ...toRefs(global) }
})