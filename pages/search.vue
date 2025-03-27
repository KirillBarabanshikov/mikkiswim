<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useProductsFilters } from '~/entities/product/api/query'
import CatalogFilters from '~/features/CatalogFilters/CatalogFilters.vue'
import { getProducts } from '~/share/api/product'
import CatalogCard from '~/share/components/catalog/CatalogCard/CatalogCard.vue'
import { useGlobalStore } from '~/share/store/globalStore'
import IconFilter from '~/share/UI/Icons/IconFilter.vue'
import SkeletonCard from '~/share/UI/SkeletonCard/SkeletonCard.vue'
import { useBodyLock } from '~/share/utils/bodyLock'

const globalStore = useGlobalStore()
const route = useRoute()
const router = useRouter()
const { lock, unlock } = useBodyLock()

const searchQuery = computed(() => (route.query.q as string) || '')

const productFilters = ref({
  query: searchQuery.value,
  color: route.query.color || undefined,
  size: route.query.size || undefined,
  priceStart: route.query.priceStart
    ? route.query.priceStart.toString()
    : undefined,
  priceEnd: route.query.priceEnd ? route.query.priceEnd.toString() : undefined
})

const {
  data: products,
  isLoading,
  error,
  refetch: refetchProductsFn
} = useQuery({
  queryKey: computed(() => ['products', productFilters.value]),
  queryFn: () => getProducts(productFilters.value),
  enabled: computed(() => !!searchQuery.value)
})

const { data: filters } = useProductsFilters('')

const columns = ref(4)
const setColumns = (num: number) => {
  columns.value = num
}

const openFilters = () => {
  globalStore.toggleFilterMenu(true)
  lock()
}

const applyFilters = () => {
  router.push({
    query: {
      q: searchQuery.value,
      color: productFilters.value.color,
      size: productFilters.value.size,
      priceStart: productFilters.value.priceStart,
      priceEnd: productFilters.value.priceEnd
    }
  })
  refetchProductsFn()
  unlock()
}

const goToProduct = (productSlug: string, catalogSlug: string) => {
  navigateTo(`/catalog/${catalogSlug}/${productSlug}`)
}

watch(
  () => route.query,
  (newQuery) => {
    productFilters.value.query = (newQuery.q as string) || ''
    productFilters.value.color = newQuery.color || undefined
    productFilters.value.size = newQuery.size || undefined
    productFilters.value.priceStart = newQuery.priceStart
      ? newQuery.priceStart.toString()
      : undefined
    productFilters.value.priceEnd = newQuery.priceEnd
      ? newQuery.priceEnd.toString()
      : undefined
    refetchProductsFn()
  },
  { immediate: true }
)

onMounted(() => {
  globalStore.closeSearch(false)
})

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="page">
    <div class="page-container container">
      <div class="page-header">
        <div class="page-categories">
          <div class="categories">
            <IconArrowLeft @click="navigateTo('/')" />
            Результаты поиска: {{ products?.length || 0 }} товаров
          </div>
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
            <div v-if="filters" class="filters-btn">
              <CatalogFilters
                v-model="globalStore.isFilterMenuVisible"
                :filters="filters"
                @apply-filters="applyFilters"
              />
            </div>
          </ClientOnly>
        </div>
      </div>

      <ClientOnly>
        <div v-if="isLoading" class="products-grid">
          <SkeletonCard v-for="n in 4" :key="n" />
        </div>
        <div v-else-if="error" class="error">
          <p>Произошла ошибка при загрузке товаров.</p>
        </div>
        <div
          v-else-if="products && products.length > 0"
          :class="['products-grid', `grid-cols-${columns}`]"
        >
          <CatalogCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @click="goToProduct(product.slug, product.catalog)"
          />
        </div>
        <div v-else class="no-results">
          <p>По вашему запросу ничего не найдено.</p>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.page {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    margin-top: 28px;

    .toggle-list {
      height: 40px;
    }
  }

  &-categories {
    display: flex;
    align-items: center;
    gap: 24px;

    .categories {
      display: flex;
      align-items: center;
      font-size: 20px;
      line-height: 155%;
      gap: 12px;

      svg {
        cursor: pointer;
        width: 24px;
      }
    }
  }

  &-filter {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 24px;

    &-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 1px solid var(--gray-400);
      transition: all 0.3s;
      color: var(--black);

      &:hover {
        background: var(--gray-400);
      }
    }

    &-grid {
      display: flex;
      align-items: center;
      gap: 24px;

      span {
        font-size: 14px;
        line-height: 155%;
      }

      .grids {
        display: flex;
        align-items: center;
        gap: 12px;

        .item {
          width: 32px;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--gray-400);
          border-radius: 50%;
          font-size: 14px;
          transition: all 0.3s ease;
          cursor: pointer;

          &.active {
            background-color: var(--black);
            color: var(--white);
            border: 1px solid var(--black);
          }
        }
      }
    }
  }

  .products-grid {
    display: grid;
    gap: 30px;
    padding: 20px 0;
    grid-template-columns: repeat(4, 1fr);

    &.grid-cols-2 {
      grid-template-columns: repeat(2, 1fr);
      max-width: 848px;
      margin: 0 auto;
    }

    &.grid-cols-3 {
      grid-template-columns: repeat(3, 1fr);
      max-width: 1288px;
      margin: 0 auto;
    }

    &.grid-cols-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .error,
  .no-results {
    text-align: center;
    padding: 20px 0;
    font-size: 16px;
    color: var(--gray-600);
  }
}

@media (max-width: $md2 + px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: $md3 + px) {
  .page-filter {
    display: none;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
