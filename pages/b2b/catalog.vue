<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
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

const { data: products, isLoading } = useQuery({
  queryKey: ['b2b-products', filters.value],
  queryFn: () =>
    $fetch(`${API}/api/products`, {
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
})

watch(
  () => filters.value.sortBy,
  (newSortBy) => {
    console.log('filters.sortBy updated to:', newSortBy)
  }
)

watch(filtersData, (newFilters) => {
  if (newFilters) {
    filters.value = {
      ...filters.value,
      ...Object.fromEntries(
        Object.entries(newFilters.availableFilters).filter(
          ([key]) => key !== 'sortBy'
        )
      )
    }
  }
})

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
      <CatalogB2BHeader
        v-model:sort-by="filters.sortBy"
        @open-filters="toggleIsOpenFilters"
      />
      <CatalogB2BCardList
        :filters="filters"
        :products="products"
        :loading="isLoading"
      />
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
    height: auto; /* Изменено на auto, чтобы вместить все фильтры */
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
