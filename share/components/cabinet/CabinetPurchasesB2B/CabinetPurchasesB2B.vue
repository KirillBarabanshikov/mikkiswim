<script setup lang="ts">
import { mockB2BOrders } from 'public/moks/mockB2BOrders'

import B2BPurchaseCard from '~/features/B2BPurchaseCard/B2BPurchaseCard.vue'

const purchases = mockB2BOrders
</script>

<template>
  <div class="purchases">
    <div class="purchases__header">
      <div class="purchases__header-item">Номер</div>
      <div class="purchases__header-item">Количество</div>
      <div class="purchases__header-item">Итого</div>
    </div>
    <div class="purchases__list">
      <B2BPurchaseCard
        v-for="purchase in purchases"
        :key="purchase.id"
        :id="purchase.id"
        :quantity="purchase.quantity"
        :total="purchase.total"
        :created="purchase.created"
        :updated="purchase.updated"
        :status="purchase.status"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'CabinetPurchasesB2B';
</style>
