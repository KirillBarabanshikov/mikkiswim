<script setup lang="ts">
const emit = defineEmits<{
  (e: 'open-filters'): void
}>()
</script>

<template>
  <div class="filters">
    <div class="filter" @click="emit('open-filters')">
      <IconFilter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.filters {
  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0.5px solid var(--gray-400);
    border-radius: 16px;
    width: 32px;
    height: 32px;

    svg {
      width: 70%;
    }
  }
}
</style>
