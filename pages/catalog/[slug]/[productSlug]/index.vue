<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useProduct } from '~/entities/product/api/query'
import ProductCombination from '~/features/ProductCombination/ProductCombination.vue'
import ProductLook from '~/features/ProductLook/ProductLook.vue'
import ProductComplete from '~/features/ProductRecommend/ProductRecommend.vue'
import { addViewerProducts } from '~/share/api/product'
import ProductAbout from '~/share/components/product/ProductAbout/ProductAbout.vue'
import ProductHeader from '~/share/components/product/ProductHeader/ProductHeader.vue'
import { useCartStore } from '~/share/store/cartStore'
import { useFavoriteStore } from '~/share/store/favoriteStore'
import Reviews from '~/widgets/Reviews/Reviews.vue'

const route = useRoute()
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()

const {
  data: product,
  isLoading: productLoading,
  error: productError
} = useProduct(route.params.productSlug.toString())

definePageMeta({
  middleware: ['auth'],
  ssr: true
})

onMounted(async () => {
  await favoriteStore.loadFavorites()
  await cartStore.fetchCart()

  const isViewed = localStorage.getItem(`isViewed_${route.params.productSlug}`)

  if (!isViewed) {
    setTimeout(async () => {
      if (product.value) {
        await addViewerProducts(product.value.id as number)
        localStorage.setItem(`isViewed_${route.params.productSlug}`, 'true')
      }
    }, 10000)
  }
})
</script>

<template>
  <div v-if="product" class="page">
    <ProductHeader :product="product" />
    <ProductAbout :product="product" />
    <Reviews :product="product" />
    <ProductLook :product="product" />
    <ProductComplete :product="product" />
  </div>
</template>

<style lang="scss" scoped>
@use 'ProductPage';
</style>
