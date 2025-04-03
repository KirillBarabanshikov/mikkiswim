<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { ref, watch, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useProductsFilters } from '~/entities/product/api/query'
import CatalogB2BCardList from '~/share/components/b2b-catalog/CatalogB2BCardList/CatalogB2BCardList.vue'
import CatalogB2BHeader from '~/share/components/b2b-catalog/CatalogB2BHeader/CatalogB2BHeader.vue'

const { data: filtersData } = useProductsFilters('b2bIn')
const route = useRoute()
const router = useRouter()

const config = useRuntimeConfig()
const API = config.public.API

const filters = ref({
  query: route.query.query?.toString() || '',
  color: route.query.color?.toString() || '',
  size: route.query.size?.toString() || '',
  priceStart: route.query.priceStart?.toString() || '',
  priceEnd: route.query.priceEnd?.toString() || '',
  catalog: route.query.catalog?.toString() || '',
  sortBy: route.query.sortBy?.toString() || 'discount',
  page: Number(route.query.page) || 1,
  limit: Number(route.query.limit) || 20
})

// Используем shallowRef для создания отдельного реактивного значения для queryKey
const queryKey = shallowRef(['b2b-products', { ...filters.value }])

// Добавим отладочную информацию для отслеживания изменений
console.log('Initial sortBy:', filters.value.sortBy)

const { data: products, isLoading } = useQuery({
  // Используем ссылку на queryKey вместо прямого объекта
  queryKey: queryKey,
  queryFn: () => {
    console.log('Sending request with sortBy:', filters.value.sortBy)
    return $fetch(`${API}/api/products`, {
      params: {
        sortBy: filters.value.sortBy,
        page: filters.value.page,
        limit: filters.value.limit,
        ...(filters.value.query && { query: filters.value.query }),
        ...(filters.value.color && { color: filters.value.color }),
        ...(filters.value.size && { size: filters.value.size }),
        ...(filters.value.priceStart && {
          priceStart: filters.value.priceStart
        }),
        ...(filters.value.priceEnd && { priceEnd: filters.value.priceEnd }),
        ...(filters.value.catalog && { catalog: filters.value.catalog })
      }
    })
  },
  enabled: !!filtersData.value
})

// Наблюдатель для отслеживания изменений sortBy и обновления queryKey
watch(
  () => filters.value,
  (newFilters) => {
    console.log(`filters changed, new sortBy: ${newFilters.sortBy}`)
    // Обновляем queryKey при любом изменении фильтров, что заставит Vue Query выполнить запрос заново
    queryKey.value = ['b2b-products', { ...newFilters }]
  },
  { deep: true }
)

// Флаг для определения было ли уже инициализировано
let filtersInitialized = false

watch(filtersData, (newFilters) => {
  if (newFilters && !filtersInitialized) {
    filtersInitialized = true

    // Не трогаем sortBy вообще, сохраняем текущее значение из URL или default
    const currentSortBy = filters.value.sortBy

    // Задаем дефолтные значения для других фильтров только если они не были в URL
    if (!route.query.color) {
      filters.value.color = newFilters.colors?.[0]?.value || ''
    }

    if (!route.query.size) {
      filters.value.size = newFilters.sizes?.[0]?.value || ''
    }

    if (!route.query.priceStart) {
      filters.value.priceStart = newFilters.prices?.min?.toString() || ''
    }

    if (!route.query.priceEnd) {
      filters.value.priceEnd = newFilters.prices?.max?.toString() || ''
    }

    console.log(
      'After filter init, sortBy =',
      filters.value.sortBy,
      'original value was',
      currentSortBy
    )
  }
})

// Отдельная функция для обновления сортировки
const updateSortBy = (newValue: string) => {
  console.log('updateSortBy called with:', newValue)
  filters.value.sortBy = newValue
}

// Наблюдатель для обновления URL
const routerUpdatePending = ref(false)

watch(
  () => filters.value,
  (newFilters) => {
    if (!routerUpdatePending.value) {
      routerUpdatePending.value = true
      console.log('Updating URL query params with sortBy:', newFilters.sortBy)
      router.push({ query: { ...newFilters } }).finally(() => {
        routerUpdatePending.value = false
      })
    }
  },
  { deep: true }
)

const isOpenFilter = ref(false)
const filterMenuRef = ref<HTMLElement | null>(null)

const toggleIsOpenFilters = () => {
  isOpenFilter.value = !isOpenFilter.value
}

onClickOutside(filterMenuRef, () => {
  isOpenFilter.value = false
})
</script>

<template>
  <div class="page">
    <div class="container">
      <!-- Прямое обновление через отдельную функцию -->
      <CatalogB2BHeader
        :sort-by="filters.sortBy"
        @update:sort-by="updateSortBy"
        @open-filters="toggleIsOpenFilters"
      />
      <CatalogB2BCardList
        :filters="filters"
        :products="products"
        :loading="isLoading"
      />
      <!-- Отладочная информация -->
      <div
        class="debug-info"
        style="margin-top: 20px; font-size: 12px; color: #999"
      >
        Текущая сортировка: {{ filters.sortBy }}
      </div>
    </div>

    <transition name="menu-top">
      <div v-if="isOpenFilter" ref="filterMenuRef" class="filter-menu">
        <div class="filter-menu-content">
          <IconClose @click="toggleIsOpenFilters" />
          <div v-if="filtersData" class="filters-container">
            <!-- Фильтр по цветам -->
            <div class="filter-section" v-if="filtersData.colors">
              <h3>Цвет</h3>
              <select v-model="filters.color">
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

            <!-- Фильтр по размерам -->
            <div class="filter-section" v-if="filtersData.sizes">
              <h3>Размер</h3>
              <select v-model="filters.size">
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

            <!-- Фильтр по цене -->
            <div class="filter-section" v-if="filtersData.prices">
              <h3>Цена</h3>
              <input
                type="number"
                v-model="filters.priceStart"
                :min="filtersData.prices.min"
                :max="filtersData.prices.max"
                placeholder="От"
              />
              <input
                type="number"
                v-model="filters.priceEnd"
                :min="filtersData.prices.min"
                :max="filtersData.prices.max"
                placeholder="До"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.page {
  .container {
    max-width: 848px;
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
