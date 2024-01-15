<!--
 * @Author: CP
 * @Date: 2024-01-15 16:23:07
 * @Description: 
-->
<template>
  <ElMain v-bind="$attrs" class="zxhc_page_content">
    <template v-for="(slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" v-bind="slot" />
    </template>
  </ElMain>
</template>

<script lang="ts" setup>
import { ElMain } from 'element-plus'

</script>

<script>
export default {
  name: 'ZMain'
}
</script>

<style lang="scss"></style>
