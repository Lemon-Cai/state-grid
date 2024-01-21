<!--
 * @Author: CP
 * @Date: 2024-01-15 16:23:07
 * @Description: 
-->
<template>
  <ElContainer :direction="layoutType" class="zxhc_page">
    <template v-for="(slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" v-bind="slot" />
    </template>
  </ElContainer>
</template>

<script lang="ts" setup>
import { ElContainer } from 'element-plus'
import { computed, useSlots, type Component, type VNode } from 'vue'

const props = defineProps({
  /**
   * @description layout direction for child elements, 默认垂直
   */
  direction: {
    type: String
    // default: 'vertical'
  }
})
const slots = useSlots()

const layoutType = computed(() => {
  if (props.direction) {
    return props.direction
  }
  if (slots && slots.default) {
    const vNodes: VNode[] = slots.default()
    const bool = vNodes.some((vNode) => {
      const tag = (vNode.type as Component).name
      return tag === 'ZHeader' || tag === 'ZFooter'
    })
    return bool ? 'vertical' : 'horizontal'
  } else {
    return 'horizontal'
  }
})
</script>

<script lang="ts">
export default {
  name: 'ZPage'
}
</script>

<style lang="scss"></style>
