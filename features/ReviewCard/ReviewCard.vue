<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'

import { useProduct } from '~/entities/product/api/query'
import type { ProductReview } from '~/entities/product/model/Product'
import { useRemoveReview, useReviews } from '~/entities/review/api/query'
import ReviewDialog from '~/widgets/Reviews/components/ReviewDialog/ReviewDialog.vue'

const queryClient = useQueryClient()

const props = defineProps<{ review: ProductReview }>()

const isOpenDialog = ref(false)
const isEditSuccessPopupOpen = ref(false)

const {
  public: { API }
} = useRuntimeConfig()

const isDelete = ref(false)

const toDeleteReview = () => {
  isDelete.value = true
}
const cancelDelete = () => {
  isDelete.value = false
}

const removeReviewMutation = useRemoveReview()
const { data: product } = useProduct(props.review.productSlug!)

const confirmDelete = () => {
  removeReviewMutation.mutate(props.review.id, {
    onSuccess: () => {
      isDelete.value = false
      queryClient.invalidateQueries({ queryKey: ['review'] })
      console.log('Отзыв удален')
    },
    onError: (error) => {
      console.error('Ошибка удаления отзыва', error)
      isDelete.value = false
    }
  })
}
const editReview = () => {
  isOpenDialog.value = true
  console.log(props.review.id)
}

const emit = defineEmits<{
  (e: 'edit-review'): void
  (e: 'delete-review'): void
}>()

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)

watch(isDelete, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : ''
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="status">
        <IconSuccess v-if="review.status !== 'new'" />
        <IconLoading v-else />
        {{ review.status == 'new' ? 'В обработке' : 'Опубликован' }}
      </div>

      <div class="actions">
        <IconEdit @click="editReview" />
        <IconDelete @click="toDeleteReview" />
      </div>
    </div>
    <div v-if="isMobile" class="score">
      <div class="date">
        {{
          new Date(review.dateAt).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        }}
      </div>
      <div class="stars">
        <IconStar
          v-for="index in 5"
          :key="index"
          :class="{ filled: index <= +review.stars }"
        />
      </div>
    </div>
    <div class="card-product">
      <div class="image">
        <img :src="`${API}${review.productImage}`" alt="Product image" />
      </div>
      <div class="name">
        <div class="product-category">{{ review.categoryTitle }}</div>
        <div class="product-title">{{ review.productTitle }}</div>
      </div>
      <div v-if="!isMobile" class="score">
        <div class="date">
          {{
            new Date(review.dateAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
          }}
        </div>
        <div class="stars">
          <IconStar
            v-for="index in 5"
            :key="index"
            :class="{ filled: index <= +review.stars }"
          />
        </div>
      </div>
    </div>
    <div class="card-advantages">
      <div class="subtitle">Достоинства</div>
      <p>{{ review.advantages }}</p>
    </div>
    <div class="card-disadvantages">
      <div class="subtitle">Комментарий</div>
      <p>{{ review.comment }}</p>
    </div>
  </div>
  <ReviewDialog
    v-if="product"
    v-show="isOpenDialog"
    :product="product"
    v-model:is-open="isOpenDialog"
    :edit="review"
    :review-id="review.id"
    @edit-success="isEditSuccessPopupOpen = true"
  />
  <transition name="fade">
    <div class="popup" v-if="isEditSuccessPopupOpen">
      <div class="popup-content">
        <div class="subtitle">
          Спасибо!
          <p>Отзыв будет опубликован после проверки модератором</p>
        </div>
        <div class="actions">
          <Button @click="isEditSuccessPopupOpen = false">Ок</Button>
        </div>
      </div>
    </div>
  </transition>
  <transition name="fade">
    <div class="popup" v-if="isDelete">
      <div class="popup-content">
        <div class="subtitle">
          Вы точно хотите удалить отзыв о товаре?
          <p>Отменить данное действие будет невозможно.</p>
        </div>
        <div class="actions">
          <Button color="gray" @click="cancelDelete">Отменить</Button>
          <Button @click="confirmDelete">Удалить</Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@use 'ReviewCard';
</style>
