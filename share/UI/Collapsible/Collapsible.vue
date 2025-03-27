<script setup lang="ts">
import { defineProps, ref } from 'vue'

import type { Product } from '~/entities/product/model/Product'
import IconArrowDown from '~/share/UI/Icons/IconArrowDown.vue'

const open = ref(false)

defineProps<{
  product: Product
  title: string
}>()

const toggleOpen = () => {
  open.value = !open.value
}
</script>

<template>
  <div class="CollapsibleRoot">
    <div class="CollapsibleTrigger" @click="toggleOpen">
      <span class="CollapsibleTitle">{{ title }}</span>
      <IconArrowDown class="CollapsibleIcon" :class="{ 'is-open': open }" />
    </div>

    <div v-if="open" class="CollapsibleContent">
      <div
        v-for="link in product.marketplaceLinks"
        :key="link.id"
        class="collapsible-link"
      >
        <a :href="link.link" target="_blank" rel="noopener noreferrer">
          <img :src="link.image" alt="" class="marketplace-image" />
        </a>
        <a :href="link.link" target="_blank" rel="noopener noreferrer">
          {{ link.link }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.CollapsibleRoot {
  width: 100%;
}

.CollapsibleTrigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 30px;
  padding: 9px 16px;
  height: 48px;
  box-shadow:
    0 2px 4px 0 rgba(0, 0, 0, 0.04),
    0 12px 12px 0 rgba(0, 0, 0, 0.04);
  background: var(--text-white);
  cursor: pointer;

  .CollapsibleIcon {
    transition: all 0.3s ease-out;
    width: 20px;

    &.is-open {
      transform: rotate(180deg);
    }
  }
}

.CollapsibleTitle {
}

.CollapsibleContent {
  background-color: var(--white);
  padding: 16px 0;
  margin-top: 8px;
  box-shadow:
    0 2px 4px 0 rgba(0, 0, 0, 0.04),
    0 12px 12px 0 rgba(0, 0, 0, 0.04);
  background: var(--text-white);
}

.marketplace-image {
  max-width: 50px;
  margin-right: 8px;
}

@media (max-width: #{$md3 + px}) {
  .CollapsibleTrigger {
    height: 40px;
  }
}
</style>
