<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  sortBy: string
}>()

const emit = defineEmits<{
  (e: 'update:sortBy', value: string): void
}>()

const isModalOpen = ref(false)

const sortOptions = [
  { label: 'Популярное', value: 'popularity' },
  { label: 'Новинки', value: 'new' },
  { label: 'Сначала дешевые', value: 'priceAsc' },
  { label: 'Сначала дорогие', value: 'priceDesc' },
  { label: 'Со скидкой', value: 'discount' }
]

const currentLabel = computed(
  () =>
    sortOptions.find((option) => option.value === props.sortBy)?.label ||
    'Со скидкой'
)

const selectSort = (value: string) => {
  emit('update:sortBy', value)
  isModalOpen.value = false
}
</script>

<template>
  <div class="catalog-sort-by">
    <button class="sort-button" @click="isModalOpen = true">
      {{ currentLabel }}
      <IconTriangle />
    </button>
    <Transition name="fade">
      <div
        v-if="isModalOpen"
        class="modal-overlay"
        @click.self="isModalOpen = false"
      >
        <div class="modal-content">
          <div class="sort-options">
            <div
              v-for="option in sortOptions"
              :key="option.value"
              :class="{ active: sortBy === option.value }"
              class="sort-option"
              @click="selectSort(option.value)"
            >
              {{ option.label }}
              <IconCheck v-if="sortBy === option.value" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.catalog-sort-by {
  position: relative;
}

.sort-button {
  font-weight: 700;
  font-size: 16px;
  line-height: 155%;
  display: flex;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  min-width: 600px;
  background: white;
  padding: 24px 20px;
  border-radius: 20px;

  .sort-options {
    display: flex;
    flex-direction: column;
    gap: 48px;
    font-weight: 400;
    font-size: 14px;
    line-height: 155%;

    .sort-option {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;

      svg {
        width: 24px;
        color: var(--gray-400);
      }
    }
  }
}
</style>
