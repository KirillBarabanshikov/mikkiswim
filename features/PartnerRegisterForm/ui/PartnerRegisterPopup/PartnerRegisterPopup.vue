<script setup lang="ts">
import IconSuccess from '~/share/UI/Icons/IconSuccess.vue'
</script>

<template>
  <div class="popup">
    <div class="popup-content">
      <div class="popup-title">
        <IconSuccess />
        Заявка отправлена
      </div>
      <div class="popup-item">
        Ваша заявка находится на рассмотрении, администратор свяжется с вами и
        уведомит вас о доступе к личному кабинету.
      </div>
      <div class="popup-item">
        После получения доступа на указанную при регистрации электронную почту
        придет виртуальная золотая карта с промо-кодом.
      </div>
      <div class="popup-actions">
        <Button @click="$emit('close')">Ок</Button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use 'PartnerRegisterPopup';
</style>
