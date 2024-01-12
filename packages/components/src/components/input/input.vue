<template>
  <el-input v-bind="$attrs" class="z_input">
    <template #[slotName] v-for="(slot, slotName) in $slots" >
      <slot :name="slotName" v-bind="slot" />
    </template>
  </el-input>
</template>

<script setup lang="ts">

// z: 众芯汉创的众 定义组件名称 <z-input />
defineOptions({
  name: "ZInput",
})

</script>
<style scoped lang='scss'>
</style>