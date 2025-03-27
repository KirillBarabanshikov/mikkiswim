<script setup lang="ts">
//@ts-ignore
import { IProduct } from '@/types/Product.ts'
// import { Badge } from '~/widgets/Search/components/UI/Badge'

const props = defineProps<{
  product: IProduct
}>()
const emits = defineEmits<{
  (eventName: 'onTarget', slug: string): void
}>()
const options = {
  arrows: true,
  progress: false,
  pagination: false,
  type: 'fade',
  rewind: true
}

const onClickProduct = () => {
  emits('onTarget', props.product.slug)
}
</script>

<template>
  <div @click.stop="onClickProduct" class="product">
    <div v-if="product.images.length" class="product-img">
      <div class="slide">
        <img :src="product.images[0]" alt="Результат" />
      </div>
    </div>
    <div class="product-body">
      <section class="body-header">
        <div class="product-badges">
          <div :class="['product-fav', { active: product.inFavorites }]">
            <IconFavorite />
          </div>
          <template v-if="product.badges?.length">
            <!--            <Badge-->
            <!--              v-for="badge in product.badges"-->
            <!--              :key="badge.id"-->
            <!--              :variant="badge.variant"-->
            <!--            >-->
            <!--              {{ badge.value }}-->
            <!--            </Badge>-->
          </template>
        </div>
      </section>
      <section class="body-footer">
        <div class="product-title">
          <span>{{ product.title }}</span>
        </div>
        <div class="product-price">
          <div class="product-price-current">{{ product.priceCurrent }} ₽</div>
          <div class="product-price-old">{{ product.priceOld }} ₽</div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'LikeCard';
</style>
