<script setup lang="ts">
import { useRouter } from 'vue-router'

import type { Cart } from '~/entities/cart/model/Cart'
import FavoriteIcon from '~/features/FavoriteIcon/FavoriteIcon.vue'
import { useCartStore } from '~/share/store/cartStore'

const router = useRouter()
const cartStore = useCartStore()
const props = defineProps<{
  item: Cart
}>()

const {
  public: { API }
} = useRuntimeConfig()

const onClickEdit = () => {
  router.push(
    `/catalog/${props.item.product.catalogs[0].slug}/${props.item.product.slug}`
  )
}

const onClickRemove = () => {
  const product = {
    productId: props.item.product.id,
    size: props.item.size
  }
  cartStore.removeProductFromCart(product)
}
</script>

<template>
  <div class="product">
    <div
      v-if="item.product?.images.length"
      class="product-img"
      @click.stop="onClickEdit"
    >
      <img :src="API + item.product.images[0].image" alt="" />
    </div>
    <div class="product-body">
      <div class="product-title">
        <span @click.stop="onClickEdit">{{ item.product.title }}</span>
        <FavoriteIcon :product="item.product" />
      </div>
      <div class="product-info">
        <div class="size">
          Размер <span>{{ item.size }}</span>
        </div>
        <div v-if="item.quantity > 1" class="count">
          {{ useFormatPrice(item.product.price) }}₽ x{{ item.quantity }}
        </div>
      </div>
      <div class="product-price">
        <div class="product-price-current">
          {{ useFormatPrice(item.product.price * item.quantity) }}
          ₽
        </div>
        <div class="product-actions">
          <IconEdit @click="onClickEdit" />
          <IconDelete @click="onClickRemove" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'BasketCard';
</style>
