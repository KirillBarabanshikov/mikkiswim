<script setup lang="ts">
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useProductsFilters } from '~/entities/product/api/query'
import CatalogB2BCardList from '~/share/components/b2b-catalog/CatalogB2BCardList/CatalogB2BCardList.vue'
import CatalogB2BHeader from '~/share/components/b2b-catalog/CatalogB2BHeader/CatalogB2BHeader.vue'
import IconClose from '~/share/UI/Icons/IconClose.vue'
import ToggleGroup from '~/share/UI/ToggleGroup/index.vue'
import type { ToggleItem } from '~/share/UI/ToggleGroup/types'

definePageMeta({
  middleware: ['auth'],
  requiresAuth: true
})

const { data: filtersData } = useProductsFilters('b2bIn')
const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()

const isOpenFilter = ref(false)
const filterMenuRef = ref<HTMLElement | null>(null)

const config = useRuntimeConfig()
const API = config.public.API

const filters = ref({
  query: '',
  color: '',
  size: '',
  priceStart: '',
  priceEnd: '',
  catalog: '',
  sortBy: 'discount',
  page: 1,
  limit: 20
})

const activeCatalogs = ref<ToggleItem | null>(null)
const activeColors = ref<ToggleItem | null>(null)
const activeSizes = ref<ToggleItem | null>(null)
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)

const toggleCatalogs = computed<ToggleItem[]>(() => {
  const items =
    filtersData.value?.childCatalogs.map((category) => ({
      id: category.id,
      value: category.slug,
      content: category.title
    })) || []
  return [{ id: 'all', value: '', content: 'Все типы' }, ...items]
})

const toggleColors = computed<ToggleItem[]>(() => {
  const items =
    filtersData.value?.colors.map((color) => ({
      id: color.value,
      value: color.value,
      content: color.content
    })) || []
  return [{ id: 'all', value: '', content: 'Все цвета' }, ...items]
})

const toggleSizes = computed<ToggleItem[]>(() => {
  const items =
    filtersData.value?.sizes.map((size) => ({
      id: size.value,
      value: size.value,
      content: size.content
    })) || []
  return [{ id: 'all', value: '', content: 'Все размеры' }, ...items]
})

const updatePage = (newPage: number) => {
  filters.value.page = newPage
  router.replace({ query: cleanFilters(filters.value) }).catch(console.error)
}

const cleanFilters = (filtersObj: typeof filters.value) => {
  const cleaned = { ...filtersObj }
  Object.keys(cleaned).forEach((key) => {
    if (!cleaned[key] || cleaned[key] === '') delete cleaned[key]
  })
  return cleaned
}

const queryKey = computed(() => ['b2b-products', cleanFilters(filters.value)])

const { data: products, isLoading } = useQuery({
  queryKey,
  queryFn: () =>
    $fetch(`${API}/api/products`, { params: cleanFilters(filters.value) }),
  enabled: computed(() => !!filtersData.value),
  refetchOnWindowFocus: false,
  staleTime: 5 * 60 * 1000,
  placeholderData: keepPreviousData
})

onMounted(() => {
  filters.value = {
    query: route.query.query?.toString() || '',
    color: route.query.color?.toString() || '',
    size: route.query.size?.toString() || '',
    priceStart: route.query.priceStart?.toString() || '',
    priceEnd: route.query.priceEnd?.toString() || '',
    catalog: route.query.catalog?.toString() || '',
    sortBy: route.query.sortBy?.toString() || 'discount',
    page: Number(route.query.page) || 1,
    limit: Number(route.query.limit) || 20
  }

  if (filtersData.value) {
    minPrice.value = filtersData.value.prices.min
    maxPrice.value = filtersData.value.prices.max
  }
})

const toggleIsOpenFilters = () => {
  isOpenFilter.value = !isOpenFilter.value
}

const updateSortBy = async (newValue: string) => {
  if (!newValue || filters.value.sortBy === newValue) return
  filters.value.sortBy = newValue
  filters.value.page = 1
  router.replace({ query: cleanFilters(filters.value) }).catch(console.error)
}

const applyFilters = async () => {
  filters.value.catalog = activeCatalogs.value?.value || ''
  filters.value.color = activeColors.value?.value || ''
  filters.value.size = activeSizes.value?.value || ''
  filters.value.priceStart = minPrice.value?.toString() || ''
  filters.value.priceEnd = maxPrice.value?.toString() || ''

  router.replace({ query: cleanFilters(filters.value) }).catch(console.error)
  isOpenFilter.value = false
}

const resetFilters = () => {
  activeCatalogs.value = toggleCatalogs.value[0] // "Все типы"
  activeColors.value = toggleColors.value[0] // "Все цвета"
  activeSizes.value = toggleSizes.value[0] // "Все размеры"
  minPrice.value = filtersData.value?.prices.min || null
  maxPrice.value = filtersData.value?.prices.max || null

  filters.value.catalog = ''
  filters.value.color = ''
  filters.value.size = ''
  filters.value.priceStart = ''
  filters.value.priceEnd = ''

  router.replace({ query: cleanFilters(filters.value) }).catch(console.error)
  isOpenFilter.value = false
}

watch(filtersData, (newFilters) => {
  if (newFilters) {
    minPrice.value = newFilters.prices.min
    maxPrice.value = newFilters.prices.max

    if (route.query.catalog)
      activeCatalogs.value =
        toggleCatalogs.value.find(
          (item) => item.value === route.query.catalog
        ) || toggleCatalogs.value[0]
    else activeCatalogs.value = toggleCatalogs.value[0]

    if (route.query.color)
      activeColors.value =
        toggleColors.value.find((item) => item.value === route.query.color) ||
        toggleColors.value[0]
    else activeColors.value = toggleColors.value[0]

    if (route.query.size)
      activeSizes.value =
        toggleSizes.value.find((item) => item.value === route.query.size) ||
        toggleSizes.value[0]
    else activeSizes.value = toggleSizes.value[0]

    if (route.query.priceStart) minPrice.value = Number(route.query.priceStart)
    if (route.query.priceEnd) maxPrice.value = Number(route.query.priceEnd)
  }
})
</script>

<template>
  <div class="page">
    <div class="container">
      <CatalogB2BHeader
        :sort-by="filters.sortBy"
        @update:sort-by="updateSortBy"
        @open-filters="toggleIsOpenFilters"
      />
      <CatalogB2BCardList
        v-if="products"
        :filters="filters"
        :products="products"
        :loading="isLoading"
        @update:page="updatePage"
      />

      <transition name="menu-right">
        <div v-show="isOpenFilter" ref="filterMenuRef" class="filter-menu">
          <div class="filter-menu-content">
            <IconClose @click="toggleIsOpenFilters" />
            <div v-if="filtersData" class="filters-container">
              <div v-if="filtersData.childCatalogs" class="filter-section">
                <div class="filter-label">Тип</div>
                <ToggleGroup
                  v-model="activeCatalogs"
                  :list="toggleCatalogs"
                  type="single"
                  variant="buttons"
                  name="category-selection"
                />
              </div>

              <div v-if="filtersData.colors" class="filter-section">
                <div class="filter-label">Цвет</div>
                <ToggleGroup
                  v-model="activeColors"
                  :list="toggleColors"
                  type="single"
                  variant="colors"
                  name="colors-selection"
                />
              </div>

              <div v-if="filtersData.sizes" class="filter-section">
                <div class="filter-label">Размер</div>
                <ToggleGroup
                  v-model="activeSizes"
                  :list="toggleSizes"
                  type="single"
                  variant="buttons"
                  name="sizes-selection"
                />
              </div>

              <div class="filter-section">
                <div class="filter-label">
                  Цена
                  <span
                    >от {{ filtersData.prices.min }}₽ до
                    {{ filtersData.prices.max }}₽</span
                  >
                </div>
                <div class="filter-price">
                  <Input
                    v-model.number="minPrice"
                    type="number"
                    placeholder="От"
                    :min="filtersData.prices.min"
                    :max="maxPrice"
                    name="min"
                  />
                  <Input
                    v-model.number="maxPrice"
                    type="number"
                    placeholder="До"
                    :min="minPrice"
                    :max="filtersData.prices.max"
                    name="max"
                  />
                </div>
              </div>

              <div class="filter-actions">
                <div class="filter-action">
                  <Button @click="applyFilters">Применить</Button>
                  <Button @click="toggleIsOpenFilters" variant="secondary"
                    >Отмена
                  </Button>
                </div>
                <Button
                  color="white-gray"
                  @click="resetFilters"
                  variant="outline"
                  >Сбросить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  .container {
    max-width: 848px;
    margin-bottom: 48px;
  }

  .filter-menu {
    height: 100%;
    max-width: 554px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    background: var(--white);
    box-shadow: 0 25px 25px 0 rgba(0, 0, 0, 0.1);
    padding: 25px 50px;
  }

  .filter-menu-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    svg {
      cursor: pointer;
      width: 20px;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .filters-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .filter-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .filter-label {
    font-weight: 700;
    margin-bottom: 8px;

    span {
      font-weight: 400;
    }
  }

  .filter-price {
    display: flex;
    gap: 12px;
  }

  .filter-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;

    .filter-action {
      display: flex;
      gap: 18px;
    }

    button {
      flex: 1;
    }
  }
}
</style>
