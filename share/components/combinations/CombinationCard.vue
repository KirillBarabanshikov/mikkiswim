<script setup lang="ts">
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'

import type { ProductCombination } from '~/entities/product-combination/model/ProductCombination'
import { useFormatPrice } from '~/share/utils/useFormatPrice'

const config = useRuntimeConfig()
const API = config.public.API

const route = useRoute()
const catalogSlug = route.params.slug

const props = defineProps<{
  combination: ProductCombination
  drag?: boolean
}>()

const onClickCombination = () => {
  navigateTo(`/catalog/${catalogSlug}/combination/${props.combination.id}`)
}

const totalPrice = computed(() => {
  if (!props.combination?.combinationsProducts?.length) return 0
  return props.combination.combinationsProducts.reduce(
    (sum, cp) => sum + (cp.product.price - (cp.discount || 0)),
    0
  )
})

const totalOldPrice = computed(() => {
  if (!props.combination?.combinationsProducts?.length) return 0
  return props.combination.combinationsProducts.reduce(
    (sum, cp) => sum + cp.product.oldPrice,
    0
  )
})
</script>

<template>
  <div class="combination" @click.stop="onClickCombination">
    <div class="combination-body">
      <div class="combination-products">
        <div
          v-for="(cp, index) in combination.combinationsProducts"
          :key="cp.id"
          class="product-item"
        >
          <div class="product-content">
            <img
              :src="API + cp.product.images[0]?.image"
              alt="Product image"
              class="product-image"
            />
            <div class="product-info">
              <span class="product-catalog" v-if="cp.product.catalogs?.length">
                {{ cp.product.catalogs[0].title }}
              </span>
              <span class="product-title">{{ cp.product.title }}</span>
            </div>
          </div>
          <div
            v-if="index < combination.combinationsProducts.length - 1"
            class="plus-icon"
          >
            <IconPlus />
          </div>
        </div>
      </div>
      <div class="combination-footer">
        <div class="column">
          <div class="combination-title">
            <span>{{ combination.title }}</span>
          </div>
          <div class="combination-price">
            <span class="current-price"
              >{{ useFormatPrice(totalPrice) }} ₽</span
            >
            <span v-if="totalOldPrice > totalPrice" class="old-price">
              {{ useFormatPrice(totalOldPrice) }} ₽
            </span>
          </div>
        </div>
        <div class="favorite-icon">
          <IconFavorite />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.combination {
  cursor: pointer;
  border-radius: 5px;
  background: var(--gray-300);

  &-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  &-products {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .product-item {
    min-width: 368px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .product-content {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      border-radius: 20px;
      padding: 12px;
      background: var(--white);

      .product-image {
        width: 88px;
        height: 88px;
        object-fit: cover;
        border-radius: 8px;
      }

      .product-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .product-catalog {
        font-size: 12px;
      }

      .product-title {
        font-size: 20px;
      }
    }

    .plus-icon {
      z-index: 2;
      margin-block: -15px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 5px solid var(--text-white);
      border-radius: 16px;
      width: 32px;
      height: 32px;
      background: var(--gray-400);
      padding: 4px;
    }
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }

  &-title {
    font-weight: 400;
    font-size: 20px;
  }

  &-price {
    display: flex;
    gap: 8px;
    align-items: center;

    .current-price {
      font-size: 16px;
      font-weight: 700;
      color: #303030;
    }

    .old-price {
      text-decoration: line-through;
      color: var(--gray);
    }
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .favorite-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #666;

    &:hover {
      color: #ff4d4f;
    }
  }
}
</style>
