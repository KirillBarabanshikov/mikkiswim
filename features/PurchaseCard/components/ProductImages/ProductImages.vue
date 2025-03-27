<script setup lang="ts">
import type { OrderProduct } from '~/entities/order/model/Order'

const props = defineProps<{
  products: OrderProduct[]
  api: string
  maxVisible?: number
  showImages?: boolean
}>()

const visibleCount = computed(() => props.maxVisible || 4)
const remainingCount = computed(() =>
  Math.max(props.products.length - (visibleCount.value - 1), 0)
)
</script>

<template>
  <div class="product-images" v-if="showImages">
    <template
      v-for="(product, index) in products.slice(0, visibleCount)"
      :key="product.product.id"
    >
      <div
        v-if="index === visibleCount - 1 && remainingCount > 0"
        class="image-wrapper"
      >
        <img
          :src="`${api}${product.product.images[0].image}`"
          alt="Product image"
        />
        <div class="overlay">
          ещё <br />
          +{{ remainingCount }}
        </div>
      </div>
      <img
        v-else
        v-if="product.product.images.length"
        :src="`${api}${product.product.images[0].image}`"
        alt="Product image"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.product-images {
  display: flex;
  gap: 8px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }

  .image-wrapper {
    position: relative;
    width: 80px;
    height: 80px;

    img {
      opacity: 0.2;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      border-radius: 5px;
    }
  }
}
</style>
