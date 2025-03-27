<script setup lang="ts">
import { ref } from 'vue'

import type { Catalog } from '~/entities/catalog/model/Catalog'
import { useGlobalStore } from '~/share/store/globalStore'
import IconArrowDown from '~/share/UI/Icons/IconArrowDown.vue'
import IconArrowRight from '~/share/UI/Icons/IconArrowRight.vue'

withDefaults(defineProps<{ categories: Catalog[]; parentPath?: string }>(), {
  parentPath: '/catalog'
})

const globalStore = useGlobalStore()
const openCategories = ref<number[]>([])

const toggleCategory = (categoryId: number) => {
  const index = openCategories.value.indexOf(categoryId)
  if (index === -1) {
    openCategories.value.push(categoryId)
  } else {
    openCategories.value.splice(index, 1)
  }
}

const isOpen = (categoryId: number) => openCategories.value.includes(categoryId)
</script>

<template>
  <ul class="catalog-list">
    <li v-for="category in categories" :key="category.id">
      <div @click="toggleCategory(category.id)" class="catalog-link">
        <NuxtLink
          :to="`${parentPath}/${category.slug}`"
          @click="
            () => {
              globalStore.toggleIsOpenCatalog()
              globalStore.toggleIsOpenMenu(false)
            }
          "
        >
          {{ category.title }}
        </NuxtLink>
        <span v-if="category.catalogs?.length" class="toggle-icon">
          <component
            :is="isOpen(category.id) ? IconArrowDown : IconArrowRight"
          />
        </span>
      </div>

      <div
        :class="[
          'child-catalog-list',
          { active: isOpen(category.id) && category.catalogs?.length }
        ]"
      >
        <CatalogList :categories="category.catalogs" />
      </div>
    </li>
    <li>
      <div class="catalog-link">
        <NuxtLink
          to="/combinations"
          @click="
            () => {
              globalStore.toggleIsOpenCatalog()
              globalStore.toggleIsOpenMenu(false)
            }
          "
        >
          Комбинации
        </NuxtLink>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/animation.scss';

.catalog-list {
  list-style: none;
  padding: 0;
  margin: 0;
  min-height: 0;
}

.catalog-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  color: #333;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
}

.toggle-icon {
  margin-left: 8px;
  transition: transform 0.3s;
  width: 16px;
  height: 16px;
}

.child-catalog-list {
  padding-left: 20px;
  overflow: hidden;
  display: grid;
  grid-template-rows: 0fr;
  transition: all 0.3s ease;

  &.active {
    grid-template-rows: 1fr;
  }
}
</style>
