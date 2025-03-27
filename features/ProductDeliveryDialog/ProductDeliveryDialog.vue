<script setup lang="ts">
import type { Product } from '~/entities/product/model/Product'
import Dialog from '~/share/UI/Dialog/Dialog.vue'
import IconDelivery from '~/share/UI/Icons/IconDelivery.vue'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Dialog :is-open="true" @close="emit('close')" :has-close="false">
    <div class="delivery">
      <div class="delivery-img">
        <IconDelivery />
      </div>
      <div class="delivery-title">Доставка</div>
      <div class="delivery-text" v-html="product.delivery"></div>
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.delivery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  max-width: 850px;

  &-title {
    font-weight: 700;
    font-size: 20px;
  }

  &-img {
    border-radius: 60px;
    padding: 20px;
    width: 120px;
    height: 120px;
    background-color: var(--gray-300);
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 80px;
      height: 80px;
    }
  }

  &-text {
    line-height: 155%;
    text-align: center;
  }
}

@media (max-width: #{$md2 + px}) {
  .delivery {
    padding: 0;
  }
}

@media (max-width: #{$md3 + px}) {
  .delivery {
    width: calc(100dvw - 40px);
  }
}
</style>
