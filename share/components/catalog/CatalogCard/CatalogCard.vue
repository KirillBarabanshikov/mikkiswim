<script setup lang="ts">
//@ts-ignore
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
import { computed, onMounted } from 'vue'

import type { Product } from '~/entities/product/model/Product'
import FavoriteIcon from '~/features/FavoriteIcon/FavoriteIcon.vue'
import { useFavoriteStore } from '~/share/store/favoriteStore'
import Badge from '~/share/UI/Badge/Badge.vue'
import IconArrowRight from '~/share/UI/Icons/IconArrowRight.vue'
import { useFormatPrice } from '~/share/utils/useFormatPrice'

const config = useRuntimeConfig()
const API = config.public.API

const route = useRoute()
const catalogSlug = route.params.slug

const props = defineProps<{
  product: Product
  drag?: boolean
}>()

const options = {
  arrows: true,
  progress: false,
  pagination: false,
  type: 'fade',
  rewind: true,
  drag: props.drag
}

const onClickProduct = () => {
  navigateTo(`/catalog/${catalogSlug}/${props.product.slug}`)
}
</script>

<template>
  <div class="product" @click.stop="onClickProduct">
    <div class="product-img">
      <div v-if="product.tags?.length" class="product-badges">
        <Badge v-for="tag in product.tags" :key="tag.id" :variant="tag.color">
          {{ tag.title }}
        </Badge>
      </div>
      <Splide
        v-if="product.images.length"
        ref="splide"
        class="splider"
        :options="options"
        :has-track="false"
      >
        <SplideTrack>
          <SplideSlide v-for="image in product.images" :key="image.id">
            <div class="slide">
              <img :src="API + image?.image" alt="Результат" />
            </div>
          </SplideSlide>
        </SplideTrack>
        <div class="splide__arrows">
          <button @click.stop class="splide__arrow splide__arrow--prev">
            <IconArrowRight />
          </button>
          <button @click.stop class="splide__arrow splide__arrow--next">
            <IconArrowRight />
          </button>
        </div>
      </Splide>
      <div v-else class="product-skeleton"></div>
    </div>
    <div class="product-body">
      <div class="product-title">
        <span>{{ product.title }}</span>
        <FavoriteIcon :product="product" />
      </div>
      <div class="product-price">
        <div v-if="product.price" class="product-price-current">
          {{ useFormatPrice(product.price) }} ₽
        </div>
        <div v-if="product.oldPrice" class="product-price-old">
          {{ useFormatPrice(product.oldPrice) }} ₽
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'CatalogCard';
</style>
