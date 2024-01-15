<!--
 * @Author: CP
 * @Date: 2024-01-11 14:13:36
 * @Description: 
-->
<template>
  <ElButton v-bind="$attrs">
    <template v-for="(slot, slotName) in $slots" #[slotName] >
      <slot :name="slotName" v-bind="slot" />
    </template>
  </ElButton>
</template>

<script setup lang="ts">

import { ElButton } from 'element-plus'

// z: 众芯汉创的众 定义组件名称 <z-input />
// defineOptions({
//   name: "ZButton",
// })

</script>

<script lang="ts">
  export default {
    name: "ZButton",
  }
</script>
<style scoped lang='scss'>
</style>