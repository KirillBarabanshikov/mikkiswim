<script setup lang="ts">
import IconHalfStar from '~/share/UI/Icons/IconHalfStar.vue'
import IconStar from '~/share/UI/Icons/IconStar.vue'

const { stars } = defineProps<{
  stars: string | number
}>()

const numericStars = computed(() => {
  const value = Number(stars)
  return isNaN(value) || value < 0 ? 0 : Math.min(value, 5)
})

const fullStars = computed(() => Math.floor(numericStars.value))
const hasHalfStar = computed(() => numericStars.value % 1 >= 0.5)
const emptyStars = computed(() => 5 - Math.ceil(numericStars.value))
</script>

<template>
  <div class="stars">
    <div v-for="item in fullStars" :key="item" class="star">
      <IconStar />
    </div>
    <div v-if="hasHalfStar" class="star half">
      <IconHalfStar />
    </div>
    <div v-for="item in emptyStars" :key="item" class="star grey">
      <IconStar />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'Stars';
</style>
