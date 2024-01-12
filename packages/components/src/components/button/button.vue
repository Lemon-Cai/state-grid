<!--
 * @Author: CP
 * @Date: 2024-01-11 14:13:36
 * @Description: 
-->
<template>
  <el-button v-bind="$attrs">
    <template #[slotName] v-for="(slot, slotName) in $slots" >
      <slot :name="slotName" v-bind="slot" />
    </template>
  </el-button>
</template>

<script setup lang="ts">

// z: 众芯汉创的众 定义组件名称 <z-input />
defineOptions({
  name: "ZButton",
})

</script>
<style scoped lang='scss'>
</style>