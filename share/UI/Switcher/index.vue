<script setup lang="ts">
type SwitcherProps = {
  modelValue: boolean
  color: 'primary'
}

type SwitcherEmits = {
  (eventName: 'update:modelValue', value: boolean): void
  (eventName: 'onChangeSwitcher', value: boolean): void
}

defineProps<SwitcherProps>()
defineEmits<SwitcherEmits>()
</script>

<template>
  <article class="switcher">
    <div class="rectangle"></div>
  </article>
</template>

<style scoped lang="scss"></style>
