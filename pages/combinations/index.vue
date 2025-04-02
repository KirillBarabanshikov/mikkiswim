<script setup lang="ts">
import { ref } from 'vue'

import { useProductCombinations } from '~/entities/product-combination/api/query'
import CatalogFilters from '~/features/CatalogFilters/CatalogFilters.vue'
import CombinationCard from '~/share/components/combinations/CombinationCard.vue'
import { useGlobalStore } from '~/share/store/globalStore'
import IconFilter from '~/share/UI/Icons/IconFilter.vue'
import SkeletonCard from '~/share/UI/SkeletonCard/SkeletonCard.vue'
import { useBodyLock } from '~/share/utils/bodyLock'
import Header from '~/widgets/Header/Header.vue'
import { useProductsFilters } from '~/entities/product/api/query'

definePageMeta({
  middleware: ['auth'],
  ssr: true
})

const globalStore = useGlobalStore()
const { lock, unlock } = useBodyLock()

const { data: productCombinations, isPending } = useProductCombinations()
const safeProductCombinations = computed(() => productCombinations.value || [])

const columns = ref(4)
const setColumns = (num: number) => {
  columns.value = num
}

const openFilters = () => {
  globalStore.toggleFilterMenu(true)
  lock()
}

const { data: filters } = useProductsFilters('b2bIn')

const refetchCombinations = () => {
  console.log('Refetch combinations with filters')
}
</script>

<template>
  <div class="page">
    <Header variant="black"></Header>
    <div class="container">
      <div class="page-header">
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
                @apply-filters="refetchCombinations"
              />
            </div>
          </ClientOnly>
        </div>
      </div>

      <ClientOnly>
        <div v-if="isPending" :class="['products-grid']">
          <SkeletonCard v-for="n in 4" :key="n" />
        </div>
        <div
          v-else
          :class="[
            'products-grid',
            productCombinations
              ? `grid-cols-${Math.min(columns, productCombinations.length)}`
              : ''
          ]"
        >
          <template
            v-for="combination in safeProductCombinations"
            :key="combination.id"
          >
            <CombinationCard :combination="combination" :drag="true" />
          </template>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'Combinations' as *;
</style>
