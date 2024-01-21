<!--
 * @Author: CP
 * @Date: 2024-01-15 16:23:07
 * @Description: 
-->
<template>
  <ElHeader class="zxhc_page_header">
    <template v-for="(slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" v-bind="slot" />
    </template>
  </ElHeader>
</template>

<script lang="ts" setup>
import { ElHeader } from 'element-plus'

</script>

<script lang="ts">
export default {
  name: 'ZHeader'
}
</script>

<style lang="scss"></style>
