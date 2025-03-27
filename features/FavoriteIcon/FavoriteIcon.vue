<script setup lang="ts">
import { computed } from 'vue'

import type { Product } from '~/entities/product/model/Product'
import { useFavoriteStore } from '~/share/store/favoriteStore'

const props = defineProps<{ product: Product }>()

const favoriteStore = useFavoriteStore()

const isChanging = ref<boolean>(false)

const toggleFavorite = async () => {
  isChanging.value = true
  await favoriteStore.toggleFavorite(props.product.id)
  isChanging.value = false
}

const isFavorite = computed(() => favoriteStore.isFavorite(props.product.id))
</script>

<template>
  <div
    :class="['favorite-icon', { active: isFavorite }]"
    @click.stop="toggleFavorite"
  >
    <IconFavoriteActive
      :class="[{ qwe: isChanging }, { active: isFavorite }]"
    />
    <IconFavorite :class="[{ qwe: isChanging }, { active: !isFavorite }]" />
  </div>
</template>

<style scoped lang="scss">
@use 'FavoriteIcon';
</style>
