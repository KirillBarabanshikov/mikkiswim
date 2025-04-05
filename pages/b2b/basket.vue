<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import B2BBasketItem from '~/share/components/b2b-basket/B2BBasketItem/B2BBasketItem.vue'
import B2BBasketTotals from '~/share/components/b2b-basket/B2BBasketTotals/B2BBasketTotals.vue'
import { useCartStore } from '~/share/store/cartStore'

const cartStore = useCartStore()
const showAllItems = ref(false)

const router = useRouter()

definePageMeta({
  middleware: ['auth'],
  requiresAuth: true
})

const {
  public: { API }
} = useRuntimeConfig()

const cartLength = computed(() => cartStore.items?.length || '')
const displayedItems = computed(() =>
  showAllItems.value ? cartStore.items : cartStore.items.slice(0, 3)
)
const totalPrice = computed(() =>
  cartStore.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
)
const totalWeight = computed(() =>
  cartStore.items.reduce(
    (sum, item) => sum + (item.product.weight || 0) * item.quantity,
    0
  )
)
const totalQuantity = computed(() =>
  cartStore.items.reduce((sum, item) => sum + item.quantity, 0)
)

onMounted(async () => {
  await cartStore.fetchCart()
})

const toggleShowAll = () => {
  showAllItems.value = !showAllItems.value
}

const goBack = () => {
  navigateTo('/b2b/catalog')
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="basket">
        <div class="basket__title">
          <IconArrowLeft @click="goBack" />
          Корзина ({{ cartLength }})
        </div>
        <div class="basket__list">
          <div
            v-for="item in displayedItems"
            :key="item.uuid"
            class="basket__list-item"
          >
            <B2BBasketItem :item="item" :api-url="API" />
          </div>
        </div>

        <button
          v-if="cartLength > 3"
          class="show-all-button"
          @click="toggleShowAll"
        >
          <span>{{ showAllItems ? 'Свернуть' : 'Развернуть' }}</span>
          <IconArrowDown
            class="arrow-icon"
            :class="{ rotated: showAllItems }"
          />
        </button>

        <B2BBasketTotals
          v-if="displayedItems.length"
          :total-quantity="totalQuantity"
          :total-weight="totalWeight"
          :total-price="totalPrice"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  .container {
    max-width: 848px;
    width: 100%;
    margin-bottom: 48px;
  }

  .basket {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    &__title {
      display: flex;
      align-items: center;
      gap: 16px;
      font-weight: 700;
      font-size: 20px;

      &:deep(svg) {
        cursor: pointer;
        width: 24px;
        height: 24px;
      }
    }

    &__list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;

      &-item {
        width: 100%;
      }
    }
  }

  .show-all-button {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 400;
    font-size: 16px;
    margin: 24px auto;
    padding: 12px 24px;
    background: none;
    cursor: pointer;
    color: var(--gray);
    transition: all 0.2s ease;
    border: none;

    &:hover {
      color: var(--primary);
    }

    .arrow-icon {
      transition: transform 0.3s ease;
      width: 16px;
      height: 16px;

      &.rotated {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
