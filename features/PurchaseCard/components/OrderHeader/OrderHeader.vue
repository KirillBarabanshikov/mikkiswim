<script setup lang="ts">
import type { Order } from '~/entities/order/model/Order'
import ProductImages from '~/features/PurchaseCard/components/ProductImages/ProductImages.vue'

const props = defineProps<{
  order: Order
  isExpanded: boolean
  api: string
}>()

const formattedDate = computed(() => {
  const date = new Date(props.order.orderDate)
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: '2-digit'
  }).format(date)
})

defineEmits(['toggle'])
</script>

<template>
  <div class="card-info">
    <div class="item-left">
      <div class="date">{{ formattedDate }}</div>
      <div class="number">{{ order.id }}</div>
      <div v-if="!isExpanded" class="price">
        {{ priceFormatter(order.productsCost) }}
        <span>, {{ order.statusText.toLowerCase() }}</span>
      </div>
    </div>

    <div class="item-right">
      <ProductImages
        :products="order.products"
        :api="api"
        :max-visible="4"
        :show-images="!isExpanded"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;
.card-info {
  display: flex;
  justify-content: space-between;

  .item-left {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .date {
      font-weight: 700;
      font-size: 20px;
    }

    .number {
      font-size: 14px;
      color: var(--gray);
    }

    .price {
      font-weight: 700;
      font-size: 20px;

      span {
        font-weight: 400;
        font-size: 14px;
        color: var(--gray);
      }
    }
  }
}

@media (max-width: $md3 + 'px') {
  .card-info {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
