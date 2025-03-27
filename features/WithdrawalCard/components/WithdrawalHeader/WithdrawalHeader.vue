<script setup lang="ts">
import type { Withdrawal } from '~/entities/withdrawal/model/Withdrawal'

const props = defineProps<{
  withdrawal: Withdrawal
  isExpanded: boolean
  api: string
}>()

const formattedDate = computed(() => {
  const date = new Date(props.withdrawal.createdAts)
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long'
  }).format(date)
})

defineEmits(['toggle'])
</script>

<template>
  <div class="card-info">
    <div class="block">
      <div class="item-left">Заявка от {{ formattedDate }}</div>
      <div class="item-right" @click="$emit('toggle')">
        {{ isExpanded ? 'Свернуть' : 'Подробнее' }}
      </div>
    </div>
    <div class="block">
      <div class="subtitle">{{ withdrawal.statusText }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
</style>
