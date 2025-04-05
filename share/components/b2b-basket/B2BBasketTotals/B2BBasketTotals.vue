<script setup lang="ts">
import { priceFormatter } from '~/share/utils/priceFormatter'

defineProps<{
  totalQuantity: number
  totalWeight: number
  totalPrice: number
}>()
</script>

<template>
  <div class="basket-totals">
    <div class="basket-totals-row">
      <div class="basket-totals__item">
        <div class="basket-totals__item-label">Количество, шт.</div>
        <div class="basket-total__item-value">
          {{ totalQuantity }}
        </div>
      </div>
      <div class="basket-totals__item">
        <div class="basket-totals__item-label">Вес, гр</div>
        <div class="basket-totals__item-value">{{ totalWeight }}</div>
      </div>
    </div>
    <div class="basket-totals-row">
      <div class="basket-totals-row__label">Итого</div>
      <div class="basket-totals-row__value">
        {{ priceFormatter(totalPrice) }}
      </div>
    </div>
    <Button>Продолжить</Button>
  </div>
</template>

<style scoped lang="scss">
.basket-totals {
  display: flex;
  flex-direction: column;
  gap: 16px;
  line-height: 155%;

  &-row {
    display: flex;
    justify-content: space-between;

    &:last-child {
      border-top: 1px solid var(--gray-400);
      padding-top: 21px;
      font-weight: 700;
      font-size: 20px;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &:nth-child(2) {
      .basket-totals__item-value {
        text-align: right;
      }
    }

    &-label {
      font-weight: 700;
      font-size: 16px;
    }

    &-value {
      font-size: 16px;
    }
  }

  button {
    margin: 0 auto;
    min-width: 261px;
  }
}
</style>
