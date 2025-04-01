<script setup lang="ts">
import { ref } from 'vue'

import SwimsuitSizeDialog from '~/features/SwimsuitSizeDialog/SwimsuitSizeDialog.vue'
import IconRuler from '~/share/UI/Icons/IconRuler.vue'

const isSizeDialogOpen = ref(false)

const toggleSize = (b: boolean) => {
  if (typeof b === 'undefined') isSizeDialogOpen.value = !isSizeDialogOpen.value
  else isSizeDialogOpen.value = b
}
</script>

<template>
  <div class="size-help-button" @click="toggleSize(true)">
    <IconRuler />
    <span>Помощь с размерами</span>
  </div>

  <SwimsuitSizeDialog v-if="isSizeDialogOpen" @close="toggleSize(false)" />
</template>

<style scoped>
.size-help-button {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
}
</style>