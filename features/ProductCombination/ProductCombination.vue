<!--<script setup lang="ts">-->
<!--import { Navigation } from 'swiper/modules'-->
<!--import { Swiper, SwiperSlide } from 'swiper/vue'-->

<!--import { useProductCombination } from '~/entities/product/api/query'-->
<!--import type { Product } from '~/entities/product/model/Product'-->
<!--import CatalogCard from '~/share/components/catalog/CatalogCard/CatalogCard.vue'-->
<!--import { useSizeWindow } from '~/share/utils/useSizeWindow'-->

<!--const { deviceSize } = useSizeWindow()-->

<!--const props = defineProps<Props>()-->

<!--const { data, isLoading, error } = useProductCombination()-->
<!--</script>-->

<!--<template>-->
<!--  <div v-if="data" id="complete" class="complete">-->
<!--    <div class="complete-content">-->
<!--      <div class="complete-title">Дополните свой образ</div>-->
<!--      <div v-if="deviceSize > DeviceSize.MOBILE" class="complete-list">-->
<!--        <CatalogCard v-for="item in data" :key="item.id" :product="item" drag />-->
<!--      </div>-->
<!--      <div v-else class="complete-slider">-->
<!--        <Swiper-->
<!--          :slides-per-view="2"-->
<!--          :space-between="8"-->
<!--          :modules="[Navigation]"-->
<!--          class="mySwiper"-->
<!--        >-->
<!--          <SwiperSlide v-for="item in data" :key="item.id" class="slide">-->
<!--            <CatalogCard :key="item.id" :product="item" :drag="false" />-->
<!--          </SwiperSlide>-->
<!--        </Swiper>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped lang="scss"></style>-->
