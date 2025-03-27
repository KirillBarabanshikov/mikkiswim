<script lang="ts" setup>
const props = defineProps<{
  width: string
  height: string
}>()
</script>

<template>
  <div class="skeleton" :style="{ width: props.width, height: props.height }" />
</template>

<style scoped lang="scss">
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
