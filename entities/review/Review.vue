<script setup lang="ts">
import type { ProductReview } from '~/entities/product/model/Product'
import IconEye from '~/share/UI/Icons/IconEye.vue'
import Stars from '~/share/UI/Stars/Stars.vue'

defineProps<{
  item: ProductReview
}>()

const emit = defineEmits<{
  (e: 'choosePhoto', index: number): void
}>()

const {
  public: { API }
} = useRuntimeConfig()

const choosePhoto = (index: number) => {
  emit('choosePhoto', index)
}
</script>

<template>
  <div class="review">
    <div class="review-header">
      <div class="side">
        <div class="review-avatar">{{ item.userNameAndSurname[0] }}</div>
        <div class="review-subtitle">{{ item.userNameAndSurname }}</div>
      </div>
      <div class="side">
        <div class="review-date">
          {{ new Date(item.dateAt).toLocaleDateString() }}
        </div>
        <div class="review-stars">
          <Stars :stars="item.stars" />
        </div>
      </div>
    </div>
    <div class="review-item">
      <div class="review-subtitle">Достоинства</div>
      <div class="review-text">{{ item.advantages }}</div>
    </div>
    <div class="review-item">
      <div class="review-subtitle">Недостатки</div>
      <div class="review-text">{{ item.flaws }}</div>
    </div>
    <div class="review-item">
      <div class="review-subtitle">Комментарий</div>
      <div class="review-text">{{ item.comment }}</div>
    </div>
    <div class="review-photos">
      <template v-for="(img, index) in item.images" :key="item">
        <div @click="choosePhoto(index)" class="img">
          <div class="img-show">
            <IconEye />
          </div>
          <img :src="API + img.image" alt="" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'Review';
</style>
