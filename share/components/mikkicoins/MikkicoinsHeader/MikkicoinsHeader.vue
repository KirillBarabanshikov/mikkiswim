<script setup lang="ts">
import IconMikkicoinsLogo from '~/share/UI/Icons/IconMikkicoinsLogo.vue'
</script>

<template>
  <div class="header">
    <IconMikkicoinsLogo />
    <div class="header-img">
      <img src="/img/mikki_page/header-1.webp" alt="" />
    </div>
    <div class="header-img">
      <img src="/img/mikki_page/header-2.webp" alt="" />
    </div>
    <div class="header-img mobile">
      <img src="/img/mikki_page/header-mobile.webp" alt="" />
    </div>
    <div class="header-content">
      <div class="header-title">
        Приятный<br />
        КЕШБЭК
      </div>
      <div class="header-text">
        Копите миккикоины и оплачивайте<br />
        <span>до 100%</span> от покупок
      </div>
      <div class="header-btn">
        <Button @click="$router.push('/')" color="white-20">
          Вперед за покупками!
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'MikkicoinsHeader';
</style>
