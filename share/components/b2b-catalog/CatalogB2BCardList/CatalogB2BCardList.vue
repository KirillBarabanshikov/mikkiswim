<script setup lang="ts">
import { ref, computed } from 'vue'
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
    page: number // Добавляем page в filters
    limit: number // Добавляем limit в filters
  }
  products: any // Типизируйте в зависимости от структуры данных
  loading: boolean
}>()

const selectedSizes = ref<Record<number, string>>({})

const totalPages = computed(() => props.products?.pagination?.total_pages || 1)

const nextPage = () => {
  const current = props.filters.page
  if (current < totalPages.value) {
    emit('update:page', current + 1)
  }
}

const prevPage = () => {
  const current = props.filters.page
  if (current > 1) {
    emit('update:page', current - 1)
  }
}

const setPage = (page: number) => {
  emit('update:page', page)
}

const updateSize = (productId: number, size: string) => {
  selectedSizes.value[productId] = size
}

const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)
</script>

<template>
  <div class="card-list">
    <div v-if="!isMobile" class="card-header">
      <div class="item">Фото</div>
      <div class="item">Название / Цена</div>
      <div class="item">РРЦ</div>
      <div class="item">Остаток,шт.</div>
      <div class="item">Вес</div>
      <div class="item">Размер</div>
    </div>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="!products || products.length === 0" class="empty">
      Товары не найдены
    </div>
    <div v-else class="products-list">
      <CatalogB2BCard
        v-for="product in products?.data || []"
        :key="product.id"
        :product="product"
        @update:size="updateSize"
      />
    </div>

    <div v-if="products && products.length > 0" class="pagination">
      <button :disabled="props.filters.page === 1" @click="prevPage">
        Назад
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: props.filters.page === page }"
        @click="setPage(page)"
      >
        {{ page }}
      </button>
      <button :disabled="props.filters.page === totalPages" @click="nextPage">
        Вперед
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

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

@media (max-width: $md2 + 'px') {
  .item:nth-child(1) {
    flex: 0 0 96px !important;
  }

  .item:nth-child(2) {
    flex: 0 0 224px !important;
  }

  .item:nth-child(3) {
    margin-right: -32px;
    flex: 0 0 67.5px !important;
  }

  .item:nth-child(4) {
    flex: 0 0 89px !important;
    text-align: center;
  }

  .item:nth-child(5) {
    margin-left: -32px;
    flex: 0 0 67.5px !important;
    text-align: right;
  }

  .item:nth-child(6) {
    flex: 0 0 96px !important;
    text-align: right;
  }
}
</style>
