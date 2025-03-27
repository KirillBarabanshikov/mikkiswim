<script setup lang="ts">
import type { Accordion, AccordionItem } from '~/share/UI/Accordion/types'
import IconAccordion from '~/share/UI/Icons/IconAccordion.vue'

defineProps<Accordion>()

const activeItem = ref<AccordionItem | null>(null)

const setActiveItem = (item: AccordionItem) =>
  activeItem.value?.id === item.id
    ? (activeItem.value = null)
    : (activeItem.value = item)
</script>

<template>
  <div class="accordion">
    <div class="accordion-list">
      <template v-for="item in list" :key="item">
        <div :class="['item', { active: activeItem?.id === item.id }]">
          <div class="item-header" @click="setActiveItem(item)">
            <span>{{ item.title }}</span>
            <IconAccordion class="item-icon" />
          </div>
          <div class="item-content">
            <div class="text" v-html="item.content"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'Accordion';
</style>
