<script setup lang="ts">
import CatalogB2BFilters from '~/share/components/b2b-catalog/CatalogB2BFilters/CatalogB2BFilters.vue'
import CatalogB2BSortBy from '~/share/components/b2b-catalog/CatalogB2BSortBy/CatalogB2BSortBy.vue'

const emit = defineEmits<{
  (e: 'open-filters'): void
  (e: 'update:sortBy', value: string): void
}>()

const props = defineProps<{
  sortBy: string
}>()

const openFilters = () => {
  emit('open-filters')
}

const handleSortByUpdate = (value: string) => {
  console.log('Header received sortBy:', value)
  emit('update:sortBy', value)
}
</script>

<template>
  <div class="catalog-header">
    <CatalogB2BSortBy
      :sort-by="props.sortBy"
      @update:sort-by="handleSortByUpdate"
    />
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
