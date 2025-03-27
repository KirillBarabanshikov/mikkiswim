<script setup lang="ts">
import type { Withdrawal } from '~/entities/withdrawal/model/Withdrawal'
import IconBox from '~/share/UI/Icons/IconBox.vue'
import IconMark from '~/share/UI/Icons/IconMark.vue'
import { priceFormatter } from '~/share/utils/priceFormatter'

defineProps<{
  withdrawal: Withdrawal
  api: string
}>()

defineEmits(['toggle'])
</script>

<template>
  <div class="card-details">
    <div class="details-content">
      <div class="item">
        <div class="label">Сумма</div>
        <div class="value">
          <span>{{ priceFormatter(withdrawal.sum) }}</span>
        </div>
      </div>
      <div class="item">
        <div class="label">Банк</div>
        <div class="value">{{ withdrawal.bank }}</div>
      </div>
      <div class="item">
        <div class="label">Счет</div>
        <div class="value">{{ withdrawal.recipient }}</div>
      </div>
      <div class="item">
        <div class="label">К/c</div>
        <div class="value">{{ withdrawal.correspondentAccount }}</div>
      </div>
      <div class="item">
        <div class="label">БИК</div>
        <div class="value">{{ withdrawal.bik }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-details {
  transition: transform 0.3s ease;

  .details-content {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .item {
      display: flex;
      justify-content: space-between;
      font-weight: 400;
      font-size: 14px;
      color: var(--gray);
      line-height: 155%;

      span {
        color: var(--black);
        font-weight: 700;
      }
    }
  }
}
</style>
