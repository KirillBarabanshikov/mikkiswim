<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useProducts, useProductsFilters } from '~/entities/product/api/query'
import CatalogFilters from '~/features/CatalogFilters/CatalogFilters.vue'
import { getCatalogs } from '~/share/api/catalog'
import CatalogCard from '~/share/components/catalog/CatalogCard/CatalogCard.vue'
import { useFavoriteStore } from '~/share/store/favoriteStore'
import { useGlobalStore } from '~/share/store/globalStore'
import IconFilter from '~/share/UI/Icons/IconFilter.vue'
import SkeletonCard from '~/share/UI/SkeletonCard/SkeletonCard.vue'
import ToggleGroup from '~/share/UI/ToggleGroup/index.vue'
import type { ToggleItem } from '~/share/UI/ToggleGroup/types'
import { useBodyLock } from '~/share/utils/bodyLock'
import Header from '~/widgets/Header/Header.vue'

const router = useRouter()
const route = useRoute()
const globalStore = useGlobalStore()
const favoriteStore = useFavoriteStore()

const { lock, unlock } = useBodyLock()

const { data: catalogs } = await useAsyncData('catalogs', () => getCatalogs())
const selectedCategorySlug = ref<string>(route.params.slug as string)

const findCategoryBySlug = (slug: string) =>
  catalogs.value?.find((category) => category.slug === slug) || null

const findParentCategory = (slug: string) =>
  catalogs.value?.find((category) =>
    category.catalogs.some((sub) => sub.slug === slug)
  ) || null

const currentCategory = computed(() =>
  findCategoryBySlug(selectedCategorySlug.value)
)

const parentCategory = computed(() =>
  findParentCategory(selectedCategorySlug.value)
)

const subCategories = computed(() => {
  if (!catalogs.value) return []

  if (currentCategory.value) {
    return currentCategory.value.catalogs
  }

  if (parentCategory.value) {
    return parentCategory.value.catalogs
  }

  return []
})

const toggleItems = computed<ToggleItem[]>(() =>
  subCategories.value.map((category) => ({
    id: category.id,
    value: category.slug,
    content: category.title
  }))
)

const activeCatalogs = ref<ToggleItem | null>(null)

const openFilters = () => {
  globalStore.toggleFilterMenu(true)
  lock()
}

const selectCategory = async (item: ToggleItem | null) => {
  if (item) {
    selectedCategorySlug.value = item.value.toString()
    activeCatalogs.value = item
  } else {
    selectedCategorySlug.value = route.params.slug as string
    activeCatalogs.value = null
  }

  productFilters.value.catalog = selectedCategorySlug.value

  await router.push({
    query: {
      ...route.query,
      category: activeCatalogs.value?.value || undefined
    }
  })

  refetchProductsFn()
  unlock()
}

watch(
  () => route.params.slug,
  (newSlug) => {
    selectedCategorySlug.value = newSlug as string
    activeCatalogs.value =
      toggleItems.value.find((item) => item.value === newSlug) || null
  },
  { immediate: true }
)

const productFilters = ref({
  catalog: selectedCategorySlug.value,
  color: route.query.color || undefined,
  size: route.query.size || undefined,
  priceStart: route.query.priceStart
    ? route.query.priceStart.toString()
    : undefined,
  priceEnd: route.query.priceEnd ? route.query.priceEnd.toString() : undefined
})

const {
  data: product,
  isLoading,
  refetch: refetchProductsFn
} = useProducts(productFilters.value)

const { data: filters } = useProductsFilters(selectedCategorySlug.value)

const columns = ref(4)
const setColumns = (num: number) => {
  columns.value = num
}

const refetchProducts = () => {
  if (route.query.category) {
    selectedCategorySlug.value = route.query.category as string
    productFilters.value.catalog = route.query.category
      ? (route.query.category as string)
      : ''
  }
  productFilters.value.color = route.query.color ? route.query.color : ''
  productFilters.value.size = route.query.size ? route.query.size : ''
  productFilters.value.priceStart = route.query.priceStart
    ? (route.query.priceStart as string)
    : ''
  productFilters.value.priceEnd = route.query.priceEnd
    ? (route.query.priceEnd as string)
    : ''
  refetchProductsFn()
}

definePageMeta({
  middleware: ['auth'],
  ssr: true
})

watch(route, (val) => {
  if (val.query.category) {
    selectedCategorySlug.value = route.query.category as string
    activeCatalogs.value =
      toggleItems.value.find((item) => item.value === route.query.category) ||
      null
  }
})

onMounted(() => {
  favoriteStore.loadFavorites()
})
</script>

<template>
  <div class="page">
    <Header variant="black"></Header>
    <div class="container">
      <div class="page-header">
        <div class="page-categories">
          <div v-if="parentCategory || currentCategory" class="categories">
            {{ parentCategory?.title || currentCategory?.title }}
          </div>

          <ToggleGroup
            class="toggle-list"
            v-if="toggleItems.length > 0"
            v-model="activeCatalogs"
            :list="toggleItems"
            type="single"
            variant="tabs"
            name="category-selection"
            @update:model-value="selectCategory"
          />
        </div>
        <div class="page-filter">
          <div class="page-filter-grid">
            <span>Вид</span>
            <div class="grids">
              <div
                :class="['item', { active: columns === 2 }]"
                @click="setColumns(2)"
              >
                2
              </div>
              <div
                :class="['item', { active: columns === 4 }]"
                @click="setColumns(4)"
              >
                4
              </div>
            </div>
          </div>

          <div class="page-filter-btn" @click="openFilters">
            <IconFilter />
          </div>

          <ClientOnly>
            <div v-if="filters" class="filters_btn">
              <CatalogFilters
                v-model="globalStore.isFilterMenuVisible"
                :filters="filters"
                @apply-filters="refetchProducts"
              />
            </div>
          </ClientOnly>
        </div>
      </div>

      <ClientOnly>
        <div v-if="isLoading" :class="['products-grid']">
          <SkeletonCard v-for="n in 4" :key="n" />
        </div>
        <div
          v-else
          :class="[
            'products-grid',
            product ? `grid-cols-${Math.min(columns, product.length)}` : ''
          ]"
        >
          <template v-for="item in product" :key="item.id">
            <CatalogCard v-if="item" :product="item" :drag="true" />
          </template>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'CatalogPage' as *;
</style>
