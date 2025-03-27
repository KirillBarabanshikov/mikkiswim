<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: string // Текущее значение размера
  options: { id: number; title: string; quantity: number; active: boolean }[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isOpen = ref(false)

const selectedOption = computed(
  () =>
    props.options.find((option) => option.title === props.modelValue)?.title ||
    props.options[0]?.title ||
    ''
)

const sortedOptions = computed(() =>
  props.options.filter((option) => option.title !== props.modelValue)
)

const selectOption = (option: string) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.custom-select')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div class="custom-select">
    <div class="select-content" :class="{ open: isOpen }">
      <button class="select-button" @click="toggleDropdown">
        {{ selectedOption || 'Выберите размер' }}
        <IconArrowDown class="arrow" :class="{ open: isOpen }" />
      </button>
      <div v-if="isOpen" class="options-list">
        <div
          v-for="option in sortedOptions"
          :key="option.id"
          class="option-item"
          @click="selectOption(option.title)"
        >
          {{ option.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-select {
  position: relative;
  min-width: 115px;
}

.select-content {
  background-color: var(--gray-200);
  border-radius: 24px;
  position: relative;
  z-index: 10;

  &.open {
    border-radius: 24px 24px 0 0;
  }
}

.select-button {
  padding: 12px 25px;
  font-size: 16px;
  border: none;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: transparent;
}

.arrow {
  width: 10px;
  transition: transform 0.2s;
}

.arrow.open {
  transform: rotate(180deg);
}

.options-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--gray-200);
  border-radius: 0 0 24px 24px;
  z-index: 10;
  margin-top: -1px;
  border-top: 1px solid var(--gray-200);
  padding: 5px;
}

.option-item {
  padding: 10px 25px;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 5px;
}

.option-item:hover {
  background-color: var(--gray-100);
}

.option-item:last-child {
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
}
</style>
