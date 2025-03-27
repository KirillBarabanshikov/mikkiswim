<script setup lang="ts">
import type { OrderProduct, Product } from '~/entities/order/model/Order'

const emit = defineEmits<{ (e: 'close'): void; (e: 'select'): void }>()

const {
  public: { API }
} = useRuntimeConfig()

const activeItemId = ref<number | null>(null)

const setActive = (id: number, product: Product) => {
  activeItemId.value = id
  emit('close')
  emit('select', product)
}

const props = defineProps<{ products: OrderProduct[] }>()
</script>

<template>
  <div class="modal-overlay">
    <div class="select-popup">
      <div class="popup-content">
        <div class="subtitle">Выберите товар для отзыва</div>
        <div class="product-list">
          <template v-for="item in products" :key="item.product.id">
            <div
              class="content"
              :class="{ active: activeItemId === item.product.id }"
              @click="setActive(item.product.id, item.product)"
            >
              <div class="item">
                <div class="product-image">
                  <img :src="API + item.product.images[0].image" alt="" />
                </div>
              </div>
              <div class="item">
                <div class="product-category">
                  {{ item.product.catalogs[0].title }}
                </div>
                <div class="product-title">{{ item.product.title }}</div>
              </div>
            </div>
          </template>
        </div>
        <div class="action" @click="$emit('close')">
          <Button :color="'gray'">Отмена</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'SelectProductForReview';
</style>
