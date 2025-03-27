<script setup lang="ts">
const emits = defineEmits(['onClick'])
const onClick = () => {
  emits('onClick')
}
</script>

<template>
  <div class="overlay" @click.stop="onClick"></div>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  background: var(--page-overlay);
  z-index: 5;
}
</style>
