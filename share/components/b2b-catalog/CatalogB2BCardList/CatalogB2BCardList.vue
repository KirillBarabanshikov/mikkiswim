<script setup lang="ts">
import { ref, watch } from 'vue'

import { useAllProducts } from '~/entities/product/api/query'
import CatalogB2BCard from '~/share/components/b2b-catalog/CatalogB2BCard/CatalogB2BCard.vue'

const props = defineProps<{
  filters: {
    query: string
    color: string
    size: string
    priceStart: string
    priceEnd: string
    catalog: string
    sortBy: string
  }
}>()

const pagination = ref({
  page: '1',
  limit: '20'
})

const selectedSizes = ref<Record<number, string>>({})

const {
  data: products,
  isLoading,
  error,
  refetch
} = useAllProducts(
  props.filters.query,
  props.filters.color,
  props.filters.size,
  props.filters.priceStart,
  props.filters.priceEnd,
  props.filters.catalog,
  props.filters.sortBy,
  pagination.value.page,
  pagination.value.limit
)

watch(
  () => props.filters,
  () => {
    pagination.value.page = '1'
    refetch()
  },
  { deep: true }
)

watch(
  pagination,
  () => {
    refetch()
  },
  { deep: true }
)

const totalPages = computed(() => products.value?.pagination?.total_pages || 1)

const nextPage = () => {
  const current = Number(pagination.value.page)
  if (current < totalPages.value) {
    pagination.value.page = String(current + 1)
  }
}

const prevPage = () => {
  const current = Number(pagination.value.page)
  if (current > 1) {
    pagination.value.page = String(current - 1)
  }
}

const setPage = (page: number) => {
  pagination.value.page = String(page)
}

const updateSize = (productId: number, size: string) => {
  selectedSizes.value[productId] = size
}
</script>

<template>
  <div class="card-list">
    <div class="card-header">
      <div class="item">Фото</div>
      <div class="item">Название / Цена</div>
      <div class="item">РРЦ</div>
      <div class="item">Остаток,шт.</div>
      <div class="item">Вес</div>
      <div class="item">Размер</div>
    </div>
    <div v-if="isLoading" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">Ошибка: {{ error.message }}</div>
    <div v-else-if="!products || products.length === 0" class="empty">
      Товары не найдены
    </div>
    <div v-else class="products-list">
      <CatalogB2BCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @update:size="updateSize"
      />
    </div>

    <!--    <div v-if="products && products.length > 0" class="pagination">-->
    <!--      <button :disabled="Number(pagination.page) === 1" @click="prevPage">-->
    <!--        Назад-->
    <!--      </button>-->
    <!--      <button-->
    <!--        v-for="page in totalPages"-->
    <!--        :key="page"-->
    <!--        :class="{ active: Number(pagination.page) === page }"-->
    <!--        @click="setPage(page)"-->
    <!--      >-->
    <!--        {{ page }}-->
    <!--      </button>-->
    <!--      <button-->
    <!--        :disabled="Number(pagination.page) === totalPages"-->
    <!--        @click="nextPage"-->
    <!--      >-->
    <!--        Вперед-->
    <!--      </button>-->
    <!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
.card-header {
  margin: 24px 0;
  display: flex;
  justify-content: flex-start;
  gap: 32px;

  .item {
    font-weight: 700;
    font-size: 16px;
    line-height: 155%;
    text-align: left;
  }

  .item:nth-child(1) {
    flex: 0 0 115px;
  }
  .item:nth-child(2) {
    flex: 0 0 261px;
  }
  .item:nth-child(3) {
    margin-right: -32px;
    flex: 0 0 73px;
  }
  .item:nth-child(4) {
    flex: 0 0 115px;
    text-align: center;
  }
  .item:nth-child(5) {
    margin-left: -32px;
    flex: 0 0 73px;
    text-align: right;
  }
  .item:nth-child(6) {
    flex: 0 0 115px;
    text-align: right;
  }
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.pagination {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button.active {
  background: #2c3e50;
  color: white;
  border-color: #2c3e50;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>
