<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useDebounceFn } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { getProducts } from '~/share/api/product'
import { useGlobalStore } from '~/share/store/globalStore'
import { useHistoryStore } from '~/share/store/historyStore'
import IconArrowLeft from '~/share/UI/Icons/IconArrowLeft.vue'
import SearchHistory from '~/widgets/Search/components/SearchHistory/SearchHistory.vue'
import SearchResult from '~/widgets/Search/components/SearchResult/SearchResult.vue'

const router = useRouter()
const historyStore = useHistoryStore()
const globalStore = useGlobalStore()
const search = ref<string>('')
const displayHistory = ref<boolean>(false)

const debouncedSearch = useDebounceFn(() => {
  refetch()
}, 500)

const { data, isLoading, error, refetch } = useQuery({
  queryKey: computed(() => ['products', { query: search.value.trim() }]),
  queryFn: () => getProducts({ query: search.value.trim() }),
  enabled: false
})

watch(search, (newVal) => {
  if (newVal) {
    debouncedSearch()
  }
})

const addHistory = (value: string) => {
  historyStore.addHistory('search', value)
}

const setSearchRoute = () => {
  if (search.value.trim()) router.push(`/search?q=${search.value.trim()}`)
}

const onTargetResult = (result: string) => {
  search.value = result
  addHistory(result)
  setSearchRoute()
  globalStore.toggleIsOpenSearch()
}

const close = () => {
  globalStore.toggleIsOpenSearch()
}
</script>

<template>
  <Transition name="menu-top">
    <div v-if="globalStore.isOpenSearch" class="search">
      <form class="form-search" @submit.prevent="setSearchRoute">
        <Input
          v-model="search"
          placeholder="Поиск"
          name="search"
          type="search"
          @focus="displayHistory = true"
          class="form-search-input"
        />
        <IconClose class="icon-close" @click="close" />
      </form>

      <SearchResult
        v-if="search.length > 2 && !isLoading && data"
        :value="data"
        @on-target-result="onTargetResult"
      />
      <p v-else-if="isLoading">Загрузка...</p>

      <SearchHistory
        v-else-if="search.length === 0 && displayHistory"
        @on-target-result="onTargetResult"
      />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use 'Search';
</style>
