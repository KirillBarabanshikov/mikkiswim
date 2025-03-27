<script setup lang="ts">
interface Props {
  outline?: boolean
  large?: boolean
  small?: boolean
  micro?: boolean
  smallest?: boolean
  rounded?: boolean
  block?: boolean
  disabled?: boolean
  color?:
    | 'black'
    | 'black-20'
    | 'black-gradient'
    | 'white-gradient'
    | 'white-20'
    | 'icon'
    | 'gray'
    | 'blue'
    | 'white-gray'
    | 'green'
    | 'red'
    | 'white'
}

withDefaults(defineProps<Props>(), {
  color: 'black'
})
const emits = defineEmits(['click'])
</script>

<template>
  <button
    :class="[
      'btn',
      color,
      {
        outline: outline,
        large: large,
        small: small,
        micro: micro,
        rounded: rounded,
        block: block,
        smallest: smallest,
        disabled: disabled
      }
    ]"
    :disabled="disabled"
    @click="emits('click')"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@use 'Button.scss' as *;
</style>
