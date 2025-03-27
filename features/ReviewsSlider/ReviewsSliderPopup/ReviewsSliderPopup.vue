<script setup lang="ts">
import Review from '~/entities/review/Review.vue'

defineProps<{
  isOpen: boolean
  activeReview: object
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', status: boolean): void
}>()

const close = () => {
  emit('update:isOpen', false)
}
</script>

<template>
  <Transition name="menu-top">
    <div v-if="isOpen" class="review-popup">
      <div @click="close" class="review-popup-close">
        <IconClose />
      </div>
      <Review :item="activeReview" />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use 'ReviewsSliderPopup';
</style>
