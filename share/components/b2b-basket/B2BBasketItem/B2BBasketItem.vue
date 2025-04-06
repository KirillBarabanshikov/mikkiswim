<script setup lang="ts">
import { priceFormatter } from '~/share/utils/priceFormatter'

const emit = defineEmits<{
  (e: 'delete', productId: number, size: string): void
}>()

const props = defineProps<{
  item: any
  apiUrl: string
}>()

const onDelete = () => {
  emit('delete', props.item.product.id, props.item.size)
}
</script>

<template>
  <div class="basket-item">
    <div class="basket-item__pic">
      <img
        :src="apiUrl + item.product.images[0].image"
        alt=""
        width="115"
        height="150"
      />
      <div class="basket-item__pic-quantity">
        {{ item.quantity }}
      </div>
    </div>
    <div class="basket-item__body">
      <div class="basket-item__row">
        <div class="basket-item__title">
          {{ item.product.catalogs[0].title }}
          <b>{{ item.product.title }}</b>
        </div>
        <div class="basket-item__actions">
          <IconEdit />
          <IconDelete @click="onDelete" />
        </div>
      </div>
      <div class="basket-item__row">
        <div class="basket-item__details">
          <div class="basket-item__details-item">
            <div class="basket-item__details-item__label">Розница</div>
            <div class="basket-item__details-item__value">
              {{ priceFormatter(item.product.price) }}
            </div>
          </div>
          <div class="basket-item__details-item">
            <div class="basket-item__details-item__label">B2B</div>
            <div class="basket-item__details-item__value">
              {{ priceFormatter(item.product.priceB2B) }}
            </div>
          </div>
          <div class="basket-item__details-item">
            <div class="basket-item__details-item__label">Размер</div>
            <div class="basket-item__details-item__value">
              {{ item.size }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.basket-item {
  width: 100%;
  display: flex;
  gap: 22px;

  &__pic {
    position: relative;
    flex-shrink: 0;

    img {
      width: 115px;
      height: 150px;
      border-radius: 8px;
      object-fit: cover;
      display: block;
    }

    &-quantity {
      position: absolute;
      bottom: 8px;
      left: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--white);
      border-radius: 8px;
      padding: 0 8px;
      width: 34px;
      height: 22px;
      font-weight: 700;
      font-size: 14px;
      line-height: 155%;
    }
  }

  &__body {
    padding: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__title {
    line-height: 155%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;

    b {
      font-weight: 700;
      font-size: 16px;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__actions {
    display: flex;
    gap: 32px;

    &:deep(svg) {
      cursor: pointer;
      color: var(--gray);
      width: 23px;
      height: 23px;
    }
  }

  &__details {
    line-height: 155%;
    display: flex;
    gap: 32px;

    &-item {
      flex: 0 0 114px;
      display: flex;
      flex-direction: column;
      gap: 4px;

      &__value {
        font-weight: 700;
        font-size: 16px;
      }

      &__label {
        color: var(--gray);
        font-size: 14px;
      }
    }
  }
}
</style>
