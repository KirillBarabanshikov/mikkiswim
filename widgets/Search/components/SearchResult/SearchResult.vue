<script setup lang="ts">
import { computed } from 'vue'

import type { Product } from '~/entities/product/model/Product'
import SearchElement from '~/widgets/Search/components/SearchElement/SearchElement.vue'

type SProps = {
  value: Product[] | undefined
}
type SEmits = {
  (eventName: 'onTargetResult', value: string): void
}

const props = defineProps<SProps>()
const emits = defineEmits<SEmits>()

const searchResult = computed(() => {
  if (!props.value || props.value.length === 0) return []
  return props.value.map(({ id, title }) => ({ id, title }))
})

const onTargetResult = (value: string) => {
  emits('onTargetResult', value)
}
</script>

<template>
  <section class="search-history">
    <div class="list">
      <template v-if="searchResult.length > 0">
        <TransitionGroup name="list">
          <SearchElement
            v-for="item in searchResult"
            :id="+item.id"
            :key="item.id"
            :title="item.title"
            type="search"
            @on-target="onTargetResult"
          />
        </TransitionGroup>
      </template>
      <p v-else>Ничего не найдено</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'SearchResult';
</style>
