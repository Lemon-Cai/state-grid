<!--
 * @Author: CP
 * @Date: 2024-01-15 16:23:07
 * @Description: 
-->
<template>
  <ElAside class="zxhc_page_aside">
    <template v-for="(slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" v-bind="slot" />
    </template>
  </ElAside>
</template>

<script lang="ts" setup>
import { ElAside } from 'element-plus'

defineOptions({
  name: 'ZAside',
})

</script>

<!-- <script lang="ts">
export default {
  name: 'ZAside'
}
</script> -->

<style lang="scss"></style>
