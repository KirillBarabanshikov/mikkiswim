<script setup lang="ts">
import { ref } from 'vue'

import type { Order } from '~/entities/order/model/Order'
import OrderActions from '~/features/PurchaseCard/components/OrderActions/OrderActions.vue'
import OrderDetails from '~/features/PurchaseCard/components/OrderDetails/OrderDetails.vue'
import OrderHeader from '~/features/PurchaseCard/components/OrderHeader/OrderHeader.vue'

const props = defineProps<{ order: Order }>()
const isExpanded = ref(false)

const {
  public: { API }
} = useRuntimeConfig()

const toggleDetails = () => {
  isExpanded.value = !isExpanded.value
}

const emit = defineEmits<{
  (e: 'refund-request'): void
  (e: 'open-review'): void
}>()
const handleToRefund = () => {
  emit('refund-request')
}

const openReviewItem = () => {
  emit('open-review')
}
</script>

<template>
  <div class="card" :class="{ expanded: isExpanded }">
    <OrderHeader :order="order" :is-expanded="isExpanded" :api="API" />

    <div class="content-wrapper">
      <OrderActions
        :class="{ active: !isExpanded }"
        @toggle="toggleDetails"
        :is-expanded="isExpanded"
        @to-refund="handleToRefund"
        @open-review="openReviewItem"
      />
      <OrderDetails
        :class="{ active: isExpanded }"
        :order="order"
        :api="API"
        @toggle="toggleDetails"
        @to-refund="handleToRefund"
        @open-review="openReviewItem"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'PurchaseCard';
</style>
