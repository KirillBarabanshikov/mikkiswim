<script setup lang="ts">
type CardPreviewProps = {
  preview: string
}
defineProps<CardPreviewProps>()
</script>

<template>
  <div class="card-preview">
    <img :src="preview" alt="Результат" />
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/mixins' as *;
.card {
  &-preview {
    @include card-preview();
  }
}
</style>
