<!--
 * @Author: CP
 * @Date: 2024-01-15 16:23:07
 * @Description: 
-->
<template>
  <ElContainer :direction="props.direction" v-bind="$attrs" class="zxhc_page">
    <template v-for="(slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" v-bind="slot" />
    </template>
  </ElContainer>
</template>

<script lang="ts" setup>
import { ElContainer } from 'element-plus'

const props = defineProps({
  /**
   * @description layout direction for child elements, 默认垂直
   */
  direction: {
    type: String,
    default: 'vertical'
  }
})

</script>

<script>
export default {
  name: 'ZPage'
}
</script>

<style lang="scss"></style>
