<script setup lang="ts">
import { useRouter } from '#vue-router'
import IconBasket from '~/share/UI/Icons/IconBasket.vue'

const router = useRouter()

const goToPurchase = () => {
  router.push('/')
}
</script>

<template>
  <div class="empty">
    <div class="empty-icon">
      <IconBasket />
    </div>
    <div class="empty-message">Корзина пуста</div>
    <div class="empty-text">
      Посмотрите новинки на нашем сайте, наверняка вам что-то понравится
    </div>
    <Button class="empty-button" size="small" @click="goToPurchase">
      К покупкам
    </Button>
  </div>
</template>

<style scoped lang="scss">
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 24px;
  max-width: 260px;
  margin: 110px auto;

  &-icon {
    color: var(--green);
    width: 56px;
    margin-bottom: -8px;
  }

  &-message {
    font-weight: 700;
    font-size: 18px;
    line-height: 1.5;
    color: var(--gray-800);
  }

  &-text {
    font-size: 14px;
    line-height: 1.5;
    color: var(--gray-600);
  }

  .empty-button {
    margin-top: 16px;
  }
}
</style>
