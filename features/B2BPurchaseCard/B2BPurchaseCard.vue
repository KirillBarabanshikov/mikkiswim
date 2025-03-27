<script setup lang="ts">
defineProps<{
  id: string
  quantity: string
  total: string
  created: string
  updated: string
  status: string
}>()
</script>

<template>
  <div class="b2b-purchase-card">
    <div class="b2b-purchase-card__body">
      <div class="b2b-purchase-card__row main-row">
        <div class="b2b-purchase-card__row-item id">{{ id }}</div>
        <div class="b2b-purchase-card__row-item quantity">{{ quantity }}</div>
        <div class="b2b-purchase-card__row-item price">{{ total }}</div>
      </div>
      <div class="b2b-purchase-card__row details-row">
        <div class="b2b-purchase-card__row-item">
          <div class="b2b-purchase-card__row-item label">Создан</div>
          {{ created }}
        </div>
        <div class="b2b-purchase-card__row-item">
          <div class="b2b-purchase-card__row-item label">Обновлен</div>
          {{ updated }}
        </div>
        <div class="b2b-purchase-card__row-item">
          <div class="b2b-purchase-card__row-item label">Статус</div>
          <span
            :style="{ color: status !== 'В обработке' ? 'var(--green)' : '' }"
            >{{ status }}</span
          >
        </div>
        <div class="b2b-purchase-card__row-item">
          <Button>PDF</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'B2BPurchaseCard';
</style>
