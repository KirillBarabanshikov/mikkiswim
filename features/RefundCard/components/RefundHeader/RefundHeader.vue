<script setup lang="ts">
import type { Refund } from '~/entities/refund/model/Refund'

const props = defineProps<{
  refund: Refund
  isExpanded: boolean
  api: string
}>()

defineEmits(['toggle'])

const formattedDate = computed(() => {
  const date = new Date(props.refund.refundDate)
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long'
  }).format(date)
})
</script>

<template>
  <div class="card-info">
    <div class="block">
      <div class="item-left">Заказ от {{ formattedDate }}</div>
      <div class="item-right" @click="$emit('toggle')">
        {{ isExpanded ? 'Свернуть' : 'Подробнее' }}
      </div>
    </div>
    <div class="block">
      <div class="subtitle">
        {{ isExpanded ? refund.orderId : refund.statusText }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;
.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  line-height: 155%;

  .block {
    display: flex;
    justify-content: space-between;

    .item-left {
      font-weight: 700;
      font-size: 20px;
    }

    .item-right {
      font-size: 14px;
      font-weight: 400;
      color: var(--gray);
      cursor: pointer;
    }

    .subtitle {
      font-weight: 400;
      font-size: 14px;
      color: var(--gray);
    }
  }
}
@media (max-width: $md3 + 'px') {
  .card {
    &-info {
      gap: 12px;
      .block {
        .item-left {
          font-size: 16px;
        }
        .item-right {
          transform: translateY(58px);
        }
      }
    }
  }
}
</style>
