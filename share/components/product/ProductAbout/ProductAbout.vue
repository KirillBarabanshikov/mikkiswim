<script setup lang="ts">
import { computed, ref } from 'vue'

import type { Product } from '~/entities/product/model/Product'
import IconBleach from '~/share/UI/Icons/IconBleach.vue'
import IconChemistry from '~/share/UI/Icons/IconChemistry.vue'
import IconIron from '~/share/UI/Icons/IconIron.vue'
import IconWash from '~/share/UI/Icons/IconWash.vue'

defineProps<{
  product: Product
}>()

const isTabActive = ref('description')

const isMobile = computed(() => window.innerWidth < 767)
</script>

<template>
  <div
    v-if="product.materials && product.description && product.care.length"
    class="about"
  >
    <div class="about-info">
      <div v-if="isMobile" class="tabs">
        <button
          v-if="product.materials"
          @click="isTabActive = 'material'"
          :class="{ active: isTabActive === 'material' }"
        >
          Материал
        </button>
        <button
          v-if="product.description"
          @click="isTabActive = 'description'"
          :class="{ active: isTabActive === 'description' }"
        >
          Описание
        </button>
      </div>

      <div
        v-if="isTabActive === 'material' && product.materials"
        class="about-block"
      >
        <div class="about-title">Материал</div>
        <div class="about-text">{{ product.materials }}</div>
      </div>

      <div
        class="about-block"
        v-else-if="isTabActive === 'description' && product.description"
      >
        <div class="about-title">Описание</div>
        <div class="about-text">{{ product.description }}</div>
      </div>

      <template v-else>
        <div v-if="product.materials" class="about-block">
          <div class="about-title">Материал</div>
          <div class="about-text">{{ product.materials }}</div>
        </div>
        <div v-if="product.description" class="about-block">
          <div class="about-title">Описание</div>
          <div class="about-text">{{ product.description }}</div>
        </div>
      </template>

      <div v-if="product.care.length" class="about-block">
        <div class="about-title">Уход</div>
        <div
          v-for="(item, index) in product.care"
          :key="index"
          class="about-text"
        >
          <IconWash v-if="item.type === 'wash'" />
          <IconChemistry v-if="item.type === 'chemistry'" />
          <IconBleach v-if="item.type === 'bleach'" />
          <IconIron v-if="item.type === 'iron'" />
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'ProductAbout' as *;
</style>
