<script setup lang="ts">
import IconSuccess from '~/share/UI/Icons/IconSuccess.vue'

const emits = defineEmits<{
  (eventName: 'close'): void
}>()
</script>

<template>
  <div class="popup">
    <div class="popup-content">
      <div class="popup-title">
        <IconSuccess />
        Успешно!
      </div>
      <div class="popup-item">
        В течении 1-го рабочего дня вам откроют доступ в личный кабинет В2В
      </div>
      <div class="popup-actions">
        <Button @click="$emit('close')">Ок</Button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use 'B2BRegisterPopup';
</style>
