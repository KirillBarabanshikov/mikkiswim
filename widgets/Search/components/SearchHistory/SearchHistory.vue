<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useHistoryStore } from '~/share/store/historyStore'
import SearchElement from '~/widgets/Search/components/SearchElement/SearchElement.vue'

type SEmits = {
  (eventName: 'onTargetResult', value: string): void
}
const emits = defineEmits<SEmits>()
const historyStore = useHistoryStore()
const history = computed(() => historyStore.getHistory('search'))

const deleteHistory = (id: number) => {
  historyStore.deleteHistory('search', id)
}
const onTargetValue = (value: string) => {
  emits('onTargetResult', value)
}
const clearHistory = () => {
  historyStore.clearHistory('search')
}

onMounted(() => {
  historyStore.loadFromLocalStorage()
})
</script>

<template>
  <section class="search-history">
    <div class="panel">
      <strong>История</strong>
      <strong @click="clearHistory" class="clear">Очистить</strong>
    </div>
    <div class="list">
      <template v-if="history.length > 0">
        <TransitionGroup name="list">
          <SearchElement
            v-for="item in history"
            :id="item.id"
            :key="item.id"
            :title="item.value"
            type="history"
            @on-delete="deleteHistory"
            @on-target="onTargetValue"
          />
        </TransitionGroup>
      </template>
      <p v-else>История запросов не найдена</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'SearchHistory';
</style>
