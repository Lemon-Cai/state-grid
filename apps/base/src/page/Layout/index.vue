<!--
 * @Author: CP
 * @Date: 2024-01-16 09:41:02
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
  <component :is="LayoutComponents[layout]"></component>
</template>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<script lang="ts" setup>
import { computed,  type Component } from 'vue'

import { useGlobalStore } from '@/stores/global'
import type { LayoutType } from '@/stores/interface'

import LayoutVertical from './LayoutVertical.vue'
import LayoutClassic from './LayoutClassic.vue'
import LayoutColumns from './LayoutColumns.vue'
import LayoutTransverse from './LayoutTransverse.vue'


const LayoutComponents: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns
};

const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>

<style lang="scss" scoped>
</style>
