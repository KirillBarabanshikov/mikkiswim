<script setup lang="ts">
import { onMounted } from 'vue'

import type { Product } from '~/entities/product/model/Product'

defineProps<{
  product: Product
  size?: string | number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const {
  public: { API }
} = useRuntimeConfig()

const close = () => {
  emit('close')
}

const toCart = () => {
  close()
  navigateTo('/basket')
}
</script>

<template>
  <div class="notifier">
    <div class="notifier-header">
      <div class="notifier-title">
        <IconSuccess />
        <span>Удалено из корзины</span>
      </div>
      <div class="notifier-close" @click="close">
        <IconClose />
      </div>
    </div>
    <div class="product">
      <div class="product-img">
        <img :src="API + product.images[0].image" alt="" />
      </div>
      <div class="product-info">
        <div class="product-title">{{ product.title }}</div>
        <div class="product-size"><span>Размер</span> {{ size }}</div>
      </div>
    </div>
    <div class="notifier-actions">
      <Button color="red" small @click="toCart">Посмотреть корзину</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'CartNotifierRemove';
</style>
