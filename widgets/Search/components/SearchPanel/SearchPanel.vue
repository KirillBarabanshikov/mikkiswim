<script setup lang="ts">
import { DialogDescription, DialogTitle, VisuallyHidden } from 'radix-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useGlobalStore } from '@/store/globalStore.ts'
import { useHistoryStore } from '@/store/historyStore.ts'
import { DeviceSize, useSizeWindow } from '@/utils/useSizeWindow.ts'
import IconArrowLeft from '~/widgets/Search/components/Icons/IconArrowLeft.vue'
import IconClose from '~/widgets/Search/components/Icons/IconClose.vue'
import IconSearch from '~/widgets/Search/components/Icons/IconSearch.vue'
import MaybeLike from '~/widgets/Search/components/SearchPanel/MaybeLike.vue'
import SearchHistory from '~/widgets/Search/components/SearchPanel/SearchHistory.vue'
import SearchResult from '~/widgets/Search/components/SearchPanel/SearchResult.vue'
import { Input } from '~/widgets/Search/components/UI/Input/index.ts'
import {
  Sheet,
  SheetContent
} from '~/widgets/Search/components/UI/Sheet/index.ts'

const router = useRouter()
const historyStore = useHistoryStore()
const globalStore = useGlobalStore()
const { deviceSize } = useSizeWindow()
const search = ref('')
const displayHistory = ref(false)

const onSearch = () => {
  if (search.value.length > 0) {
    addHistory(search.value)
    setSearchRoute(search.value)
    globalStore.toggleIsOpenSearch()
  }
}

const addHistory = (value: string) => {
  historyStore.addHistory('search', value)
}

const setSearchRoute = (searchValue: string) => {
  if (searchValue) router.push(`/search?q=${searchValue}`)
}

const onRouteLikeCard = () => {
  globalStore.toggleIsOpenSearch()
}

const onTargetResult = (result: string) => {
  search.value = result
  addHistory(search.value)
  setSearchRoute(search.value)
  globalStore.toggleIsOpenSearch()
}
</script>

<template>
  <Sheet>
    <SheetContent side="top">
      <VisuallyHidden>
        <DialogTitle>Search</DialogTitle>
        <DialogDescription>Search form</DialogDescription>
      </VisuallyHidden>
      <div class="search">
        <form class="form-search" @submit.prevent="onSearch">
          <IconArrowLeft
            v-if="deviceSize < DeviceSize.LAPTOP"
            class="icon-arrow"
            @click="globalStore.toggleIsOpenSearch()"
          />
          <Input
            v-model="search"
            placeholder="Поиск"
            class="input"
            @focus="displayHistory = true"
          />
          <IconSearch class="icon-search" @click="onSearch" />
          <IconClose
            v-if="deviceSize > DeviceSize.TABLET"
            class="icon-close"
            @click="globalStore.toggleIsOpenSearch()"
          />
        </form>
        <SearchResult
          v-if="search.length > 0"
          :value="search"
          @on-target-result="onTargetResult"
        />
        <SearchHistory
          v-else-if="search.length === 0 && displayHistory"
          @on-target-result="onTargetResult"
        />
        <MaybeLike
          v-if="deviceSize < DeviceSize.LAPTOP"
          @on-route="onRouteLikeCard"
        />
      </div>
    </SheetContent>
  </Sheet>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.search {
  padding: 48px 97px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: 0.3s all ease-in-out;
  @media (max-width: $md2 + px) {
    padding: 32px 16px 24px 16px;
  }
  @media (max-width: $md3 + px) {
    height: 100vh;
    padding: 10px;
  }
}

.icon-close,
.icon-search,
.icon-arrow {
  cursor: pointer;
  max-width: 24px;
  max-height: 24px;
}

.form-search {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;

  .icon-search {
    position: absolute;
    top: 8px;
    right: 45px;
    color: var(--gray);
  }
}

@media (max-width: $md2 + px) {
  .input {
    background: var(--gray-200);
    border-radius: 16px;
    border: none;
    padding: 0 16px 0 45px;
  }
  .icon-search {
    transform: rotate(90deg);
    left: 70px;
  }
  .icon-arrow {
    margin: 0 8px 0 16px;
  }
}
</style>
