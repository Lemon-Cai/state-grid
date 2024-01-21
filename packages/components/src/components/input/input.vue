<!--
 * @Author: CP
 * @Date: 2024-01-12 15:53:00
 * @Description: 
-->
<template>
  <ElInput class="z_input">
    <template v-for="(slot, slotName) in $slots" #[slotName] >
      <slot :name="slotName" v-bind="slot" />
    </template>
  </ElInput>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus';
// z: 众芯汉创的众 定义组件名称 <z-input />
// defineOptions({
//   name: "ZInput",
// })

</script>
<script lang="ts">
  export default {
    name: "ZInput",
  }
</script>
<style scoped lang='scss'>
</style>