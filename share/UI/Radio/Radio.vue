<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

// Определяем пропсы компонента
const props = defineProps<{
  modelValue: string | number | null
  value: string | number
  label?: string
  name?: string
}>()

// Определяем событие для v-model
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

// Функция обработки изменения радио-баттона
const onChange = () => {
  emit('update:modelValue', props.value)
}
</script>

<template>
  <label class="radio-wrapper">
    <input
      type="radio"
      :name="name"
      :value="props.value"
      :checked="modelValue === props.value"
      @change="onChange"
    />
    <span class="radio-label">{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
.radio-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

input[type='radio'] {
  accent-color: var(--gray);
  width: 16px;
  height: 16px;
}

.radio-label {
  user-select: none;
}
</style>
