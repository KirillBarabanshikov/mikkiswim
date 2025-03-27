<script setup lang="ts">
import type { Product } from '~/entities/product/model/Product'
import ProductInfo from '~/share/components/product/ProductInfo/ProductInfo.vue'

defineProps<{ product: Product }>()

const {
  public: { API }
} = useRuntimeConfig()

const { deviceSize } = useSizeWindow()

const options = {
  arrows: false,
  progress: false,
  pagination: true,
  type: 'fade',
  rewind: true
}
</script>

<template>
  <div class="catalog">
    <div class="catalog-layout">
      <div
        v-if="deviceSize > DeviceSize.MOBILE && product.images[0]?.image"
        class="catalog-image"
      >
        <img :src="API + product.images[0]?.image" alt="Результат" />
      </div>

      <Splide
        v-if="deviceSize <= DeviceSize.MOBILE && product?.images"
        ref="splide"
        class="splider"
        :options="options"
      >
        <SplideSlide v-for="slide in product?.images" :key="slide">
          <div class="slide">
            <img :src="API + slide.image" alt="Результат" />
          </div>
        </SplideSlide>
      </Splide>

      <ProductInfo :product="product" />
    </div>

    <div v-if="deviceSize > DeviceSize.MOBILE" class="catalog-gallery">
      <div
        v-for="(image, index) in product.images.slice(1, 4)"
        :key="index"
        class="catalog-gallery-item"
      >
        <img :src="API + image.image" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'ProductHeader' as *;
</style>
