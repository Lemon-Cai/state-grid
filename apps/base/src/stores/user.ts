/*
 * @Author: CP
 * @Date: 2024-01-15 15:32:37
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import type { User } from '@/config/userData'
import WujieVue from 'wujie-vue3'

const { bus } = WujieVue

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User | null>(null)
  const token = ref<string>('')

  const setUser = (userParam: User) => {
    user.value = userParam
    bus.$emit('changeUser', {
      user: toRaw(user.value)
    })
  }

  return { token, user, setUser }
})
