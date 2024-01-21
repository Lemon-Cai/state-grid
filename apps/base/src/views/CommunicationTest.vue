<!--
 * @Author: CP
 * @Date: 2024-01-16 13:17:55
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
  <el-space direction="vertical" class="box" :size="40">
    <el-divider>
      <h2>主应用页面</h2>
    </el-divider>
    <!-- <user-info /> -->
    <el-divider>
      <h2>主应用消息</h2>
    </el-divider>
    <!-- <message-trigger /> -->
    <el-divider>
      <h2>主应用Counter</h2>
    </el-divider>
    <!-- <counter /> -->
  </el-space>
</template>

<script lang="ts">
export default {
  name: 'CommunicationTest',
}
</script>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { ElDivider, ElSpace } from 'element-plus'
const user = useUserStore()
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
}
</style>
