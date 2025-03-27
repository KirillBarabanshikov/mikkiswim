<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'

import { useToggle } from '@vueuse/core'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, ref, watch } from 'vue'

import type { Product, ProductReview } from '~/entities/product/model/Product'
import Review from '~/entities/review/Review.vue'
import ReviewsSliderPopup from '~/features/ReviewsSlider/ReviewsSliderPopup/ReviewsSliderPopup.vue'
import IconClose from '~/share/UI/Icons/IconClose.vue'
import IconSliderLeft from '~/share/UI/Icons/IconSliderLeft.vue'
import IconSliderRight from '~/share/UI/Icons/IconSliderRight.vue'
import { DeviceSize, useSizeWindow } from '~/share/utils/useSizeWindow'

const props = defineProps<{
  product: Product & { reviews?: ProductReview[] }
  isOpen: boolean
  activeReview: ProductReview | undefined
  activeImage: number
}>()

const emit = defineEmits<{
  (e: 'update:activeImage', index: number): void
  (e: 'update:isOpen', status: boolean): void
  (e: 'update:activeReview', review: { image: string }): void
}>()

const {
  public: { API }
} = useRuntimeConfig()
const { deviceSize } = useSizeWindow()
const [open, toggleOpen] = useToggle()
const { unlock } = useBodyLock()

const prev = ref(null)
const next = ref(null)

const activeSlide = ref(0)
const activeReviewPopup = ref()
const currentImageIndex = ref(props.activeImage)

watch(
  () => props.activeImage,
  (newVal) => {
    currentImageIndex.value = newVal
  }
)

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal && props.product.reviews) {
      const reviewIndex = props.product.reviews.findIndex(
        (item) => item.id === props.activeReview?.id
      )
      activeSlide.value = reviewIndex >= 0 ? reviewIndex : 0
      currentImageIndex.value = props.activeImage
    }
  }
)

const morePhotosList = computed(() => {
  const reviews = props.product.reviews ?? []
  if (
    !reviews.length ||
    activeSlide.value < 0 ||
    activeSlide.value >= reviews.length
  ) {
    return []
  }
  return reviews.filter((rev) => rev.id !== reviews[activeSlide.value].id)
})

const allImages = computed(() => {
  const reviews = props.product.reviews ?? []
  return reviews.flatMap((review) =>
    review.images.map((image, index) => ({
      ...image,
      reviewId: review.id,
      advantages: review.advantages,
      flaws: review.flaws,
      comment: review.comment,
      stars: review.stars,
      userNameAndSurname: review.userNameAndSurname,
      dateAt: review.dateAt,
      index
    }))
  )
})

const setActiveImg = (index: number) => {
  currentImageIndex.value = index
  emit('update:activeImage', index)
}

const slideChange = (e: any) => {
  activeSlide.value = e.activeIndex
  if (deviceSize.value > DeviceSize.MOBILE) {
    currentImageIndex.value = 0
    emit('update:activeImage', 0)
  }
}

const setActiveReview = (item: { image: string }) => {
  activeReviewPopup.value = item
  toggleOpen()
}

const close = () => {
  emit('update:isOpen', false)
  unlock()
}

const setStartSlide = () => {
  emit('update:activeImage', 0)
  currentImageIndex.value = 0
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      console.log('ReviewsSlider opened with:', {
        activeReview: props.activeReview,
        activeImage: props.activeImage,
        productReviews: props.product.reviews,
        initialSlide: props.product.reviews?.findIndex(
          (item) => item.id === props.activeReview?.id
        )
      })
    }
  }
)
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="popup">
      <div @click="close" class="popup-close">
        <IconClose v-if="deviceSize > DeviceSize.MOBILE" />
        <IconSliderLeft v-else />
      </div>
      <div ref="prev" class="swiper-prev">
        <IconSliderLeft />
      </div>
      <div ref="next" class="swiper-next">
        <IconSliderRight />
      </div>
      <div class="popup-slider">
        <Swiper
          v-if="deviceSize > DeviceSize.MOBILE"
          :slides-per-view="1"
          :space-between="30"
          :initial-slide="
            product.reviews?.findIndex(
              (item) => item.id === activeReview?.id
            ) ?? 0
          "
          :navigation="{
            prevEl: prev,
            nextEl: next
          }"
          :modules="[Navigation]"
          class="mySwiper"
          @active-index-change="slideChange"
          @slide-change="setStartSlide"
        >
          <template v-for="item in product.reviews" :key="item.id">
            <SwiperSlide class="slide">
              <div
                v-if="item.images[currentImageIndex]?.image"
                class="slide-img"
              >
                <img
                  :src="API + item.images[currentImageIndex]?.image"
                  alt=""
                />
                <img
                  :src="API + item.images[currentImageIndex]?.image"
                  alt=""
                  class="background"
                />
              </div>
              <div class="slide-content">
                <Review :item="item" @choose-photo="setActiveImg" />
              </div>
            </SwiperSlide>
          </template>
        </Swiper>
        <Swiper
          v-else
          :slides-per-view="1"
          :space-between="0"
          :initial-slide="
            allImages.findIndex(
              (item) =>
                item.reviewId === activeReview?.id && item.index === activeImage
            ) ?? 0
          "
          :modules="[Navigation]"
          class="mySwiper"
          @slide-change="setStartSlide"
        >
          <template v-for="item in allImages" :key="item.image">
            <SwiperSlide class="slide">
              <div class="slide-img">
                <img :src="API + item.image" alt="" />
                <img :src="API + item.image" alt="" class="background" />
                <div @click="setActiveReview(item)" class="slide-review">
                  Отзыв
                  <Stars :stars="item.stars" />
                </div>
              </div>
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
      <div class="popup-title">Другие фото пользователей</div>
      <div class="popup-photos">
        <template v-for="item in morePhotosList" :key="item.id">
          <template v-for="img in item.images" :key="img.image">
            <img :src="API + img.image" alt="" />
          </template>
        </template>
      </div>
      <Teleport to="body">
        <ReviewsSliderPopup
          v-model:is-open="open"
          :active-review="activeReviewPopup"
        />
      </Teleport>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use 'ReviewsSlider';
</style>
