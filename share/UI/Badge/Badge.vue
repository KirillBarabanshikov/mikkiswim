<script setup lang="ts">
export type BadgeVariant = 'blue' | 'red' | 'yellow'

withDefaults(
  defineProps<{
    variant?: BadgeVariant
  }>(),
  {
    variant: 'blue'
  }
)
</script>

<template>
  <div :class="['badge', variant]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use 'Badge';
</style>
