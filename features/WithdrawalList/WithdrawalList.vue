<script setup lang="ts">
import type { Withdrawal } from '~/entities/withdrawal/model/Withdrawal'
import WithdrawalCard from '~/features/WithdrawalCard/WithdrawalCard.vue'

const props = defineProps<{ withdrawal: Withdrawal[] }>()
</script>

<template>
  <div class="list">
    <template v-for="withdraw in withdrawal" :key="withdraw.id">
      <WithdrawalCard :withdrawal="withdraw" />
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
