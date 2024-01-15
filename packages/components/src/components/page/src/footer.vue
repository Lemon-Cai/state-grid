<!--
 * @Author: CP
 * @Date: 2024-01-15 16:23:07
 * @Description: 
-->
<template>
  <ElFooter v-bind="$attrs" class="zxhc_page_footer">
    <template v-for="(slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" v-bind="slot" />
    </template>
  </ElFooter>
</template>

<script lang="ts" setup>
import { ElFooter } from 'element-plus'


</script>

<script>
export default {
  name: 'ZFooter'
}
</script>

<style lang="scss"></style>
