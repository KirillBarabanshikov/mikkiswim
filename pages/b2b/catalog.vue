<script setup lang="ts">
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useProductsFilters } from '~/entities/product/api/query'
import CatalogB2BCardList from '~/share/components/b2b-catalog/CatalogB2BCardList/CatalogB2BCardList.vue'
import CatalogB2BHeader from '~/share/components/b2b-catalog/CatalogB2BHeader/CatalogB2BHeader.vue'

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

const updatePage = (newPage: number) => {
  filters.value.page = newPage
  router.replace({ query: cleanFilters(filters.value) }).catch(console.error)
}

const pendingFilters = ref({ ...filters.value })

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
  pendingFilters.value = { ...filters.value }
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
  Object.assign(filters.value, pendingFilters.value)

  router.replace({ query: cleanFilters(filters.value) }).catch(console.error)

  isOpenFilter.value = false
}

const resetFilters = () => {
  pendingFilters.value = { ...filters.value }
  isOpenFilter.value = false
}
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

      <transition name="menu-top">
        <div v-show="isOpenFilter" ref="filterMenuRef" class="filter-menu">
          <div class="filter-menu-content">
            <IconClose @click="toggleIsOpenFilters" />
            <div v-if="filtersData" class="filters-container">
              <div class="filter-section" v-if="filtersData.colors">
                <h3>Цвет</h3>
                <select v-model="pendingFilters.color">
                  <option value="">Все цвета</option>
                  <option
                    v-for="color in filtersData.colors"
                    :key="color.value"
                    :value="color.value"
                  >
                    {{ color.content }}
                  </option>
                </select>
              </div>

              <div class="filter-section" v-if="filtersData.sizes">
                <h3>Размер</h3>
                <select v-model="pendingFilters.size">
                  <option value="">Все размеры</option>
                  <option
                    v-for="size in filtersData.sizes"
                    :key="size.value"
                    :value="size.value"
                  >
                    {{ size.content }}
                  </option>
                </select>
              </div>

              <div class="filter-section" v-if="filtersData.prices">
                <h3>Цена</h3>
                <input
                  type="number"
                  v-model="pendingFilters.priceStart"
                  :min="filtersData.prices.min"
                  :max="filtersData.prices.max"
                  placeholder="От"
                />
                <input
                  type="number"
                  v-model="pendingFilters.priceEnd"
                  :min="filtersData.prices.min"
                  :max="filtersData.prices.max"
                  placeholder="До"
                />
              </div>

              <button @click="applyFilters">Применить</button>
              <button @click="resetFilters">Отмена</button>
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
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    height: auto;
    background: var(--white);
    box-shadow: 0 25px 25px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;

    &-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;

      svg {
        cursor: pointer;
        width: 20px;
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
  }

  .filters-container {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .filter-section {
    display: flex;
    flex-direction: column;
    gap: 10px;

    h3 {
      font-size: 16px;
      font-weight: 600;
    }

    select,
    input {
      padding: 8px;
      border: 1px solid var(--gray-400);
      border-radius: 8px;
      font-size: 14px;
    }

    input {
      width: 100px;
    }
  }
}
</style>
