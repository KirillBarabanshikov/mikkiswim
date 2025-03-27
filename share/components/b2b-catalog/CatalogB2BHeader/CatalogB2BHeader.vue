<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'open-filters'): void
}>()

import CatalogB2BFilters from '~/share/components/b2b-catalog/CatalogB2BFilters/CatalogB2BFilters.vue'
import CatalogB2BSortBy from '~/share/components/b2b-catalog/CatalogB2BSortBy/CatalogB2BSortBy.vue'

const sortBy = ref('discount')

const openFilters = () => {
  emit('open-filters')
}
</script>

<template>
  <div class="catalog-header">
    <CatalogB2BSortBy v-model:sort-by="sortBy" />
    <CatalogB2BFilters @open-filters="openFilters" />
  </div>
</template>

<style scoped>
.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
</style>
