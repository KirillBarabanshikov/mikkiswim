<script setup lang="ts">
import { usePartnerOrders } from '~/entities/user-partner/api/query'
import { priceFormatter } from '~/share/utils/priceFormatter'

const { data: orders, isPending } = usePartnerOrders()
</script>

<template>
  <div class="purchases-list">
    <template v-for="order in orders" :key="order.id">
      <div class="purchase-card">
        <div class="item-left">
          <div class="date">
            Заказ от {{ new Date(order.orderDate).toLocaleDateString() }}
          </div>
          <div class="id">
            {{ order.id }}
          </div>
        </div>
        <div class="item-right">
          <div class="mikkicoins">
            + {{ order.mikkiCoinsGain }}
            <IconMikki />
          </div>
          <div class="amount">
            {{ priceFormatter(order.total) }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use 'PurchaseListByPromo';
</style>
