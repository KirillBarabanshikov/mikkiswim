<script setup lang="ts">
//@ts-ignore
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'

import type { ProductCombination } from '~/entities/product-combination/model/ProductCombination'
import Badge from '~/share/UI/Badge/Badge.vue'
import IconArrowRight from '~/share/UI/Icons/IconArrowRight.vue'
import { useFormatPrice } from '~/share/utils/useFormatPrice'

const config = useRuntimeConfig()
const API = config.public.API

const route = useRoute()
const catalogSlug = route.params.slug

const props = defineProps<{
  combination: ProductCombination
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

const onClickCombination = () => {
  navigateTo(`/catalog/${catalogSlug}/combination/${props.combination.id}`)
}

// const totalPrice = computed(() =>
//   props.combination.combinationProducts.reduce(
//     (sum, cp) => sum + (cp.product.price - (cp.discount || 0)),
//     0
//   )
// )
//
// const totalOldPrice = computed(() =>
//   props.combination.combinationProducts.reduce(
//     (sum, cp) => sum + cp.product.oldPrice,
//     0
//   )
// )
</script>

<template>
  <div class="combination" @click.stop="onClickCombination">
    <div class="combination-img">
      <Splide
        ref="splide"
        class="splider"
        :options="options"
        :has-track="false"
      >
        <SplideTrack>
          <SplideSlide>
            <div class="slide">
              <img :src="API + combination.image" alt="Combination image" />
            </div>
          </SplideSlide>
        </SplideTrack>
        <div class="splide__arrows">
          <button @click.stop class="splide__arrow splide__arrow--prev">
            <IconArrowLeft />
          </button>
          <button @click.stop class="splide__arrow splide__arrow--next">
            <IconArrowRight />
          </button>
        </div>
      </Splide>
    </div>
    <div class="combination-body">
      <div class="combination-title">
        <span>{{ combination.title }}</span>
      </div>
      <div class="combination-products">
        <div
          v-for="cp in combination.combinationProducts"
          :key="cp.id"
          class="product-item"
        >
          <span>{{ cp.product.title }}</span>
          <span class="price">
            {{ useFormatPrice(cp.product.price - (cp.discount || 0)) }} ₽
            <span v-if="cp.discount" class="discount">
              (-{{ cp.discount }} ₽)
            </span>
          </span>
        </div>
      </div>
      <!--      <div class="combination-price">-->
      <!--        <div class="combination-price-current">-->
      <!--          {{ useFormatPrice(totalPrice) }} ₽-->
      <!--        </div>-->
      <!--        <div v-if="totalOldPrice > totalPrice" class="combination-price-old">-->
      <!--          {{ useFormatPrice(totalOldPrice) }} ₽-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.combination {
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  &-img {
    position: relative;
    width: 100%;
    overflow: hidden;

    .splider {
      width: 100%;
      height: 250px; /* Фиксированная высота для изображения */
    }

    .slide {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .splide__arrows {
      .splide__arrow {
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        &--prev {
          left: 10px;
          transform: rotate(180deg);
        }

        &--next {
          right: 10px;
        }
      }
    }
  }

  &-body {
    padding: 15px;
  }

  &-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  &-products {
    margin-bottom: 10px;

    .product-item {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-bottom: 5px;

      .price {
        font-weight: 500;

        .discount {
          color: #ff4d4f;
          font-size: 12px;
          margin-left: 5px;
        }
      }
    }
  }

  &-price {
    display: flex;
    gap: 10px;
    align-items: center;

    &-current {
      font-size: 16px;
      font-weight: 700;
      color: #000;
    }

    &-old {
      font-size: 14px;
      color: #999;
      text-decoration: line-through;
    }
  }
}
</style>
