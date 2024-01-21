<template>
  <div class="logo flx-center">
    <img class="logo-img" :src="state.logo" alt="logo" />
    <span class="logo-text" v-if="state.title">{{ state.title }}</span>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import  { APP_TITLE } from '@/config/constants'
import Logo from '@/assets/images/logo.svg'

const state = reactive({
  logo: Logo,
  title: APP_TITLE
})
</script>

<style lang="scss" scoped>
  .logo {
    
  }
</style>