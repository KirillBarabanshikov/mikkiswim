<script setup lang="ts">
import { useReviews } from '~/entities/review/api/query'
import ReviewCard from '~/features/ReviewCard/ReviewCard.vue'

const emit = defineEmits<{
  (e: 'edit-review'): void
  (e: 'delete-review'): void
}>()

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)

const { data: reviews, isPending } = useReviews()
</script>

<template>
  <section class="reviews">
    <div v-if="isPending">
      <div v-if="!isMobile" class="list">
        <template v-for="i in 2" :key="i">
          <Skeleton width="850px" height="350px" />
        </template>
      </div>
      <div v-else class="list">
        <template v-for="i in 2" :key="i">
          <Skeleton width="360px" height="400px" />
        </template>
      </div>
    </div>
    <div v-else-if="reviews?.length === 0" class="zero-block">
      <div class="subtitle">
        Оставляйте отзывы и получайте <span>микки монеты!</span>
      </div>
      <p>
        За каждый отзыв вы получите <span>+ 50 <IconMikki /></span>
      </p>
      <p>
        Делитесь своими впечатлениями о товарах и получайте монеты на покупку
        других!
      </p>
    </div>
    <div v-else class="list">
      <template v-for="review in reviews" :key="review.id">
        <ReviewCard
          :review="review"
          @edit-review="$emit('edit-review')"
          @delete-review="$emit('delete-review')"
        />
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'CabinetReviews';
</style>
