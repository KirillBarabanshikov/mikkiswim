<script setup lang="ts">
import { watchEffect } from 'vue'

import type { ToggleItem } from '~/share/UI/ToggleGroup/types'

const props = withDefaults(
  defineProps<{
    list: ToggleItem[]
    modelValue: ToggleItem | null
    type: 'single' | 'multiple'
    variant?: 'buttons' | 'tabs' | 'colors'
    grid?: number
    name: string
    validator?: any
  }>(),
  {
    validator: undefined,
    variant: 'tabs',
    grid: undefined
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', payload: ToggleItem | null): void
}>()

const { value, errorMessage, handleChange } = useField(
  props.name,
  props.validator
)

watchEffect(() => {
  value.value = props.modelValue
})

const isActive = (item: ToggleItem) => {
  if (props.type === 'single') {
    return (value.value as ToggleItem)?.id === item.id
  } else if (props.type === 'multiple') {
    return (
      Array.isArray(value.value) &&
      value.value.some((activeItem) => activeItem.id === item.id)
    )
  }
  return false
}

const setActiveItem = (item: ToggleItem) => {
  if (props.type === 'single') {
    if ((value.value as ToggleItem)?.id === item.id) {
      handleChange(null)
      emit('update:modelValue', null)
    } else {
      handleChange(item)
      emit('update:modelValue', item)
    }
  } else if (props.type === 'multiple') {
    const modelValueArray = Array.isArray(value.value) ? value.value : []
    const exists = modelValueArray.find(
      (activeItem) => activeItem.id === item.id
    )
    if (exists) {
      const newValue = modelValueArray.filter(
        (activeItem) => activeItem.id !== item.id
      )
      handleChange(newValue)
      emit('update:modelValue', newValue)
    } else {
      const newValue = [...modelValueArray, item]
      handleChange(newValue)
      emit('update:modelValue', newValue)
    }
  }
}
</script>

<template>
  <div :class="['toggle', variant]">
    <div
      class="toggle-list"
      :style="
        grid
          ? `display: grid; grid-template-columns: repeat(${grid}, 1fr)`
          : 'display: flex'
      "
    >
      <template v-for="item in list" :key="item.id">
        <div
          :class="['item', { active: isActive(item) }]"
          @click="setActiveItem(item)"
        >
          <span
            v-if="variant === 'colors'"
            :style="{ background: item.value }"
          />
          <span v-else>{{ item.content }}</span>
        </div>
      </template>
    </div>
    <div v-if="errorMessage" class="error">
      {{
        errorMessage === 'this cannot be null'
          ? 'Выберите номинал'
          : 'Выберите номинал'
      }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'ToggleGroup';

.error {
  font-size: 14px;
  color: var(--red);
  margin: 8px 0 0 4px;
}
.item {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  text-align: center;
  user-select: none;
}

.item.active {
  background-color: black;
  color: white;
}
</style>
