<!--
 * @Author: CP
 * @Date: 2024-01-16 13:29:54
 * @LastEditors: 
 * @Description: 
-->
<template>
  <h2>主应用内控制跳转</h2>
  <el-space :size="20">
    <router-link to="/main/communication-test">
      <z-button type="primary">跳转至主应用 page1</z-button>
    </router-link>
    <router-link to="/vue2App/communication-test">
      <z-button type="primary">跳转至Vue2子应用</z-button>
    </router-link>
    <router-link to="/reactApp/communication-test">
      <z-button type="primary">跳转至React18子应用</z-button>
    </router-link>
    <router-link to="/viteApp/communication-test">
      <z-button type="primary">跳转至Vite子应用</z-button>
    </router-link>
  </el-space>
</template>

<script lang="ts">
export default {
  name: 'NavigateView',
}
</script>

<script lang="ts" setup>
  import { ElSpace } from 'element-plus' // 待改造
  import { ZButton } from '@apps/components'
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2em;
}
</style>
