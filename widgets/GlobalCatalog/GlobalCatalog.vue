<script setup lang="ts">
import { useCatalogs } from '~/entities/catalog/api/query'
import { useGlobalStore } from '~/share/store/globalStore'
import CatalogList from '~/widgets/GlobalCatalog/components/CatalogList/CatalogList.vue'

const { data: categories, isLoading, error } = useCatalogs()
const globalStore = useGlobalStore()
</script>

<template>
  <Transition name="fade">
    <div v-if="globalStore.isOpenCatalog" class="catalog">
      <div class="container">
        <div class="catalog-container">
          <div class="catalog-nav">
            <div class="catalog-header">
              <IconLogo class="catalog-logo" />
              <IconClose
                class="catalog-close"
                @click="globalStore.toggleIsOpenCatalog"
              />
            </div>
            <nav class="catalog-menu">
              <template v-if="!isLoading && categories">
                <CatalogList :categories="categories" />
              </template>
              <div v-else-if="isLoading">Загрузка...</div>
              <div v-else-if="error">Произошла ошибка при загрузке данных</div>
            </nav>
          </div>
          <div class="catalog-img">
            <img src="/img/global_catalog/catalog.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use 'GlobalCatalog';
</style>
