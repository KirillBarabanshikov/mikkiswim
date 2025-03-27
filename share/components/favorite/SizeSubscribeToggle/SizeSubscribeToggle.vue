<script setup lang="ts">
import { useField } from 'vee-validate'
import { watchEffect } from 'vue'

import type { ToggleItem } from '~/share/UI/ToggleGroup/types'

const props = defineProps<{
  list: ToggleItem[]
  modelValue: ToggleItem | null
  name: string
  validator?: any
}>()

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

const isActive = (item: ToggleItem) =>
  (value.value as ToggleItem)?.id === item.id

const setActiveItem = (item: ToggleItem) => {
  if ((value.value as ToggleItem)?.id === item.id) {
    handleChange(null)
    emit('update:modelValue', null)
  } else {
    handleChange(item)
    emit('update:modelValue', item)
  }
}
</script>

<template>
  <div class="toggle">
    <div class="toggle-list">
      <template v-for="item in list" :key="item.id">
        <div
          :class="['item', { active: isActive(item) }]"
          @click="setActiveItem(item)"
        >
          <IconEmail v-if="item.quantity === 0" />
          <span>{{ item.content }}</span>
        </div>
      </template>
    </div>
    <div v-if="errorMessage" class="error">
      {{
        errorMessage === 'this cannot be null'
          ? 'Выберите размер'
          : errorMessage
      }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'SizeSubscribeToggle';
</style>
