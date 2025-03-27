<script setup lang="ts">
import IconMessage from '~/share/UI/Icons/IconMessage.vue'

defineProps<{
  isExpanded: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'to-refund'): void
  (e: 'open-review'): void
}>()
</script>

<template>
  <div class="card-actions">
    <div class="item-left">
      <div class="review" @click="emit('open-review')">
        <IconMessage />
        Оставить отзыв
      </div>
    </div>
    <div class="item-right">
      <div class="refund" @click="$emit('to-refund')">Оформить возврат</div>
      <div class="more" @click="$emit('toggle')">
        {{ isExpanded ? 'Свернуть' : 'Подробнее' }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  min-height: 52px;
  opacity: 1;
  transition: opacity 0.2s ease;
  font-weight: 700;
  font-size: 13px;
  line-height: 155%;
  letter-spacing: 0.02em;
  color: var(--gray);
  cursor: pointer;

  .item-right {
    display: flex;
    gap: 32px;

    :hover {
      border-radius: 30px;
      background: var(--gray-400);
      color: var(--black);
    }

    .refund {
      padding: 0 10px;
      height: 25px;
      transition: all 0.3s ease;
    }

    .more {
      padding: 0 10px;
      height: 25px;
      transition: all 0.3s ease;
    }
  }

  .item-left {
    transition: all 0.3s ease;

    .review {
      padding: 0 10px;
      height: 25px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    :hover {
      border-radius: 30px;
      background: var(--gray-400);
      color: var(--black);
    }

    svg {
      width: 22px;
      height: 20px;
    }
  }
}

@media (max-width: $md3 + 'px') {
  .item-right {
    font-size: 13px;
    font-weight: 400;
    color: var(--black);
    width: 100%;
    gap: 0;
    justify-content: space-between;
  }

  .item-left {
    display: none;
  }
}
</style>
