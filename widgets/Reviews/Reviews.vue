<script setup lang="ts">
import { useProductReviews } from '~/entities/product/api/query'
import type { Product, ProductReview } from '~/entities/product/model/Product'
import Review from '~/entities/review/Review.vue'
import ReviewsSlider from '~/features/ReviewsSlider/ReviewsSlider.vue'
import { useAuthStore } from '~/share/store/authStore'
import { useUserStore } from '~/share/store/userStore'
import IconEye from '~/share/UI/Icons/IconEye.vue'
import { DeviceSize, useSizeWindow } from '~/share/utils/useSizeWindow'
import Progress from '~/widgets/Reviews/components/Progress/Progress.vue'
import ReviewDialog from '~/widgets/Reviews/components/ReviewDialog/ReviewDialog.vue'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const {
  public: { API }
} = useRuntimeConfig()
const userStore = useUserStore()
const authStore = useAuthStore()
const { lock } = useBodyLock()
const { deviceSize } = useSizeWindow()

const { data: reviewsData, isLoading: reviewsLoading } = useProductReviews(
  props.product.id as number
)

const activeReview = ref<ProductReview | undefined>()
const activeImage = ref(0)
const isOpen = ref(false)
const isOpenDialog = ref(false)

const maxImages = computed(() => {
  if (deviceSize.value >= DeviceSize.LAPTOP) return 7
  if (deviceSize.value >= DeviceSize.TABLET) return 6
  return 4
})

const reviews = computed(() => reviewsData.value?.data ?? [])
const totalReviews = computed(() => reviewsData.value?.totalItems ?? 0)
const totalImagesCount = computed(() =>
  reviews.value.reduce(
    (total, review) => total + (review.images?.length ?? 0),
    0
  )
)

const productImagesList = computed(() => {
  if (!reviews.value?.length) return []

  const reviewList = reviews.value.map((review) => ({
    id: review.id,
    images:
      review.images?.slice(0, maxImages.value / reviews.value.length) ?? []
  }))

  return reviewList
    .flatMap(({ id, images }) =>
      images.map((image) => ({ image: image.image, id }))
    )
    .slice(0, maxImages.value)
})

const oneStar = computed(
  () => reviews.value.filter((item) => item.stars === 1).length ?? 0
)
const twoStar = computed(
  () => reviews.value.filter((item) => item.stars === 2).length ?? 0
)
const threeStar = computed(
  () => reviews.value.filter((item) => item.stars === 3).length ?? 0
)
const fourStar = computed(
  () => reviews.value.filter((item) => item.stars === 4).length ?? 0
)
const fiveStar = computed(
  () => reviews.value.filter((item) => item.stars === 5).length ?? 0
)

const roundedAverage = computed(() => {
  if (!reviews.value?.length) return 0
  const sum = reviews.value.reduce(
    (acc, review) => acc + Number(review.stars),
    0
  )
  const avg = Math.round((sum / reviews.value.length) * 2) / 2
  return avg
})

const roundedAverageDisplay = computed(() => {
  return reviews.value?.length
    ? `${roundedAverage.value.toFixed(1)} / 5`
    : 'Нет отзывов'
})

const openPopup = (review: ProductReview, index: number) => {
  console.log('Opening popup with review:', review, 'and image index:', index)
  activeImage.value = index
  activeReview.value = review
  isOpen.value = true
  lock()
}

const openDialog = () => {
  isOpenDialog.value = true
  lock()
}
</script>

<template>
  <section class="reviews">
    <div v-if="reviewsLoading" class="loading">Загрузка отзывов...</div>
    <div v-else class="reviews-content">
      <div class="reviews-title">
        Отзывы <span>{{ totalReviews }}</span>
      </div>

      <template v-if="totalReviews">
        <div class="reviews-subtitle">Фото покупателей</div>

        <div class="reviews-photos">
          <template
            v-for="(item, index) in productImagesList"
            :key="item.id + '-' + index"
          >
            <div
              class="img"
              @click="
                () => {
                  const review =
                    reviews.find((review) => review.id === item.id) ||
                    ({} as ProductReview)
                  const imageIndex = review.images.findIndex(
                    (img) => img.image === item.image
                  )
                  openPopup(review, imageIndex)
                }
              "
            >
              <div
                v-if="index !== productImagesList.length - 1"
                class="img-show"
              >
                <IconEye />
              </div>
              <div v-else class="img-more">
                <span
                  >еще<br />+{{
                    totalImagesCount - productImagesList.length
                  }}</span
                >
              </div>
              <img :src="API + item.image" alt="Фото отзыва" />
            </div>
          </template>
        </div>

        <div class="reviews-list">
          <template v-for="item in reviews" :key="item.id">
            <Review :item="item" @choose-photo="openPopup(item, $event)" />
          </template>
        </div>
      </template>
    </div>

    <div class="reviews-side">
      <div class="side-header">
        <div class="reviews-title">
          Отзывы <span>{{ totalReviews }}</span>
        </div>
        <div class="side">
          <span>{{ roundedAverageDisplay }}</span>
          <Stars :stars="roundedAverage" />
        </div>
      </div>
      <div v-if="reviews.length" class="side-stars">
        <div class="item">
          <span>5 звезд</span>
          <Progress :progress="(fiveStar / reviews.length) * 100 + '%'" />
          <span>{{ fiveStar }}</span>
        </div>
        <div class="item">
          <span>4 звезды</span>
          <Progress :progress="(fourStar / reviews.length) * 100 + '%'" />
          <span>{{ fourStar }}</span>
        </div>
        <div class="item">
          <span>3 звезды</span>
          <Progress :progress="(threeStar / reviews.length) * 100 + '%'" />
          <span>{{ threeStar }}</span>
        </div>
        <div class="item">
          <span>2 звезды</span>
          <Progress :progress="(twoStar / reviews.length) * 100 + '%'" />
          <span>{{ twoStar }}</span>
        </div>
        <div class="item">
          <span>1 звезда</span>
          <Progress :progress="(oneStar / reviews.length) * 100 + '%'" />
          <span>{{ oneStar }}</span>
        </div>
      </div>
      <div class="side-bottom">
        <div class="side-info">
          <div class="side-text">
            Оставь отзыв и получи <span>+ 50<IconMikki /></span>
          </div>
          <div class="side-link" @click="navigateTo('/mikkicoins')">
            Что такое микки монеты?
          </div>
        </div>
        <div
          v-if="
            reviews.findIndex((item) => item.userId === userStore?.user?.id) ===
              -1 && authStore.isAuthenticated
          "
          class="side-action"
        >
          <Button @click="openDialog">Оставить отзыв</Button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <ReviewDialog :product="product" v-model:is-open="isOpenDialog" />
    </Teleport>

    <Teleport to="body">
      <ReviewsSlider
        v-model:is-open="isOpen"
        v-model:active-image="activeImage"
        :product="{ ...product, reviews }"
        :active-review="activeReview"
      />
    </Teleport>
  </section>
</template>

<style scoped lang="scss">
@use 'Reviews';
</style>
