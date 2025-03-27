<script setup lang="ts">
import { ref } from 'vue'

import CatalogB2BCardList from '~/share/components/b2b-catalog/CatalogB2BCardList/CatalogB2BCardList.vue'
import CatalogB2BHeader from '~/share/components/b2b-catalog/CatalogB2BHeader/CatalogB2BHeader.vue'
import { useAuthStore } from '~/share/store/authStore'
import { useGlobalStore } from '~/share/store/globalStore'
import { useUserStore } from '~/share/store/userStore'

const authStore = useAuthStore()
const globalStore = useGlobalStore()
const userStore = useUserStore()

definePageMeta({
  middleware: ['auth'],
  requiresAuth: true,
  ssr: false
})

const filters = ref({
  query: '',
  color: '',
  size: '',
  priceStart: '',
  priceEnd: '',
  catalog: '',
  sortBy: 'discount'
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
      <CatalogB2BCardList :filters="filters" />
    </div>
    <transition name="menu-top">
      <div v-if="isOpenFilter" ref="filterMenuRef" class="filter-menu">
        <div class="filter-menu-content">
          <IconClose @click="toggleIsOpenFilters" />
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
    height: 150px;
    background: var(--white);
    box-shadow: 0 25px 25px 0 rgba(0, 0, 0, 0.1);

    &-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      svg {
        cursor: pointer;
        width: 20px;
      }
    }
  }
}
</style>
