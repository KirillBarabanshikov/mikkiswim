<script setup lang="ts">
import { useRouter } from 'vue-router'

import type { Product } from '~/entities/product/model/Product'
import FavoriteIcon from '~/features/FavoriteIcon/FavoriteIcon.vue'
import CardHover from '~/share/components/favorite/FavoriteCard/CardHover/CardHover.vue'
import CardPreview from '~/share/components/favorite/FavoriteCard/CardPreview/CardPreview.vue'
import { useFavoriteStore } from '~/share/store/favoriteStore'

const props = defineProps<{
  product: Product
}>()
const router = useRouter()
const favoriteStore = useFavoriteStore()
const isHover = ref<boolean>(false)

const {
  public: { API }
} = useRuntimeConfig()

const onClickProduct = () => {
  router.push(`/product/${props.product.slug}`)
}

const toggleFavorite = () => {
  favoriteStore.toggleFavorite(props.product.id)
}

const isFavorite = computed(() => favoriteStore.isFavorite(props.product.id))
</script>

<template>
  <article
    v-if="favoriteStore.favorites || favoriteStore.favoriteProducts"
    class="product"
  >
    <div
      v-if="product.images?.length"
      class="product-img"
      @pointerenter="isHover = true"
      @pointerleave="isHover = false"
    >
      <CardPreview :preview="API + product.images[0].image" />
      <CardHover
        :sizes="product.sizes"
        :product="product"
        :class="{ hover: isHover }"
      />
    </div>
    <div class="product-body">
      <div class="product-title">
        <span @click="onClickProduct">{{ product.title }}</span>
        <FavoriteIcon :product="product" />
      </div>
      <div class="product-price">
        <div v-if="product.price" class="product-price-current">
          {{ useFormatPrice(product.price) }} ₽
        </div>
        <div v-if="product.oldPrice" class="product-price-old">
          {{ useFormatPrice(product.oldPrice) }} ₽
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use 'FavoriteCard';
</style>
