<script setup lang="ts">
import { onMounted } from 'vue'

import { useCartStore } from '~/share/store/cartStore'

const cartStore = useCartStore()

definePageMeta({
  middleware: ['auth'],
  requiresAuth: true
})

onMounted(() => {
  cartStore.fetchCart()
})
</script>

<template>
  <div>
    <h1>B2B Basket</h1>
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

p {
  font-size: 16px;
}
</style>
