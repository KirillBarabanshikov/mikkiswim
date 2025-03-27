<script setup lang="ts">
import IconMinus from '~/share/UI/Icons/IconMinus.vue'
import IconPlus from '~/share/UI/Icons/IconPlus.vue'

const props = defineProps<{
  modelValue: number
  max?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void
}>()

const minus = () => {
  if (props.modelValue > 0) emit('update:modelValue', props.modelValue - 1)
}
const plus = () => {
  if (props.max) {
    if (props.modelValue + 1 <= props.max)
      emit('update:modelValue', props.modelValue + 1)
  }
}
</script>

<template>
  <div v-if="max && modelValue >= 0" class="counter">
    <div :class="['counter-btn', { disabled: modelValue < 1 }]" @click="minus">
      <IconMinus />
    </div>
    <span>{{ modelValue }}</span>
    <div class="counter-btn" @click="plus">
      <IconPlus />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'Counter';
</style>
