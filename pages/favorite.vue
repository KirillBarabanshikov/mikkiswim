<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import type { Product } from '~/entities/product/model/Product'
import { useWishes } from '~/entities/user/api/query'
import CatalogCard from '~/share/components/catalog/CatalogCard/CatalogCard.vue'
import FavoriteCard from '~/share/components/favorite/FavoriteCard/FavoriteCard.vue'
import FavoriteEmpty from '~/share/components/favorite/FavoriteEmpty/FavoriteEmpty.vue'
import FavoriteInfo from '~/share/components/favorite/FavoriteInfo/FavoriteInfo.vue'
import { useFavoriteStore } from '~/share/store/favoriteStore'
import { useUserStore } from '~/share/store/userStore'
import { useSizeWindow } from '~/share/utils/useSizeWindow'

const { deviceSize } = useSizeWindow()
const favoriteStore = useFavoriteStore()
const userStore = useUserStore()

const isAuth = computed(() => !!userStore.user)

const data = ref<Product[]>([])
const isLoading = ref(false)
const error = ref<Error | null>(null)

const fetchData = () => {
  isLoading.value = true
  error.value = null

  if (isAuth.value) {
    const { data: wishesData, error: wishesError } = useWishes()
    watch(
      wishesData,
      (newData) => {
        if (newData) data.value = newData
        isLoading.value = false
      },
      { immediate: true }
    )

    watch(wishesError, (err) => {
      if (err) error.value = err as Error
      isLoading.value = false
    })
  } else {
    data.value = favoriteStore.favoriteProducts
    isLoading.value = false
  }
}

watch(isAuth, fetchData, { immediate: true })

watch(
  () => favoriteStore.favoriteProducts,
  () => {
    data.value = favoriteStore.favoriteProducts
  },
  { deep: true }
)

definePageMeta({
  middleware: ['auth']
})

onMounted(async () => {
  await favoriteStore.loadFavorites()
})
</script>

<template>
  <div class="page">
    <div class="container">
      <section class="favorites">
        <h1 class="page-title">Избранное</h1>
        <FavoriteInfo
          v-if="!isAuth && deviceSize === DeviceSize.MOBILE"
          class="favorites-info-mobile"
        />
        <div v-if="data && data.length > 0" class="favorites-list">
          <FavoriteInfo v-if="!isAuth && deviceSize > DeviceSize.MOBILE" />
          <template v-if="deviceSize > DeviceSize.MOBILE">
            <FavoriteCard
              v-for="product in data"
              :key="product.id"
              :product="product"
            />
          </template>
          <template v-else>
            <CatalogCard
              v-for="product in data"
              :key="product.id"
              :product="product"
            />
          </template>
        </div>
        <FavoriteEmpty v-else class="favorites-empty" />
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.page {
  &-title {
    font-size: 20px;
    font-weight: normal;
    @media (max-width: $md3 + px) {
      display: none;
    }
  }
}

.favorites {
  display: flex;
  flex-direction: column;
  gap: 35px;
  margin: 47px 0 0 0;

  &-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 48px 32px;
    @media (max-width: $md1 + px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: $md3 + px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
  }

  &-info {
    &-mobile {
      margin: 0 auto;
    }
  }

  &-empty {
    margin: 0 auto;
  }
}
</style>
