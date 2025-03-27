<script setup lang="ts">
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useRecommendedProducts } from '~/entities/product/api/query'
import type { Product } from '~/entities/product/model/Product'
import CatalogCard from '~/share/components/catalog/CatalogCard/CatalogCard.vue'
import { useSizeWindow } from '~/share/utils/useSizeWindow'

const { deviceSize } = useSizeWindow()

interface Props {
  product: Product
}

const props = defineProps<Props>()

const { data, isLoading, error } = useRecommendedProducts(+props.product.id)
</script>

<template>
  <div v-if="data" class="recommend">
    <div class="recommend-content">
      <div class="recommend-title">Рекомендовано для вас</div>
      <div v-if="deviceSize > DeviceSize.MOBILE" class="recommend-list">
        <template v-for="item in data" :key="item.id">
          <CatalogCard :product="item" drag />
        </template>
      </div>
      <div v-else class="recommend-slider">
        <Swiper
          :slides-per-view="3"
          :space-between="8"
          :modules="[Navigation]"
          class="mySwiper"
        >
          <template v-for="item in data" :key="item">
            <SwiperSlide class="slide">
              <CatalogCard :product="item" :drag="false" />
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'ProductLook';
</style>
