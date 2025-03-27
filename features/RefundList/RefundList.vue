<script setup lang="ts">
import type { Refund } from '~/entities/refund/model/Refund'
import RefundCard from '~/features/RefundCard/RefundCard.vue'

const props = defineProps<{ refunds: Refund[] }>()
</script>

<template>
  <div class="list">
    <template v-for="refund in refunds" :key="refund.id">
      <RefundCard :refund="refund" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
