<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useGlobalStore } from '~/share/store/globalStore'
import Button from '~/share/UI/Button/index.vue'

const router = useRouter()
const globalStore = useGlobalStore()
</script>

<template>
  <div class="header">
    <div class="header-bg">
      <img class="desktop" src="/img/partners_page/bg.webp" alt="" />
      <img class="laptop" src="/img/partners_page/bg-laptop.webp" alt="" />
      <img class="mobile" src="/img/partners_page/bg-mobile.webp" alt="" />
    </div>
    <div class="header-content">
      <div class="header-title">
        Вы тренер и у вас много спортсменов? Давайте сотрудничать!
      </div>
      <div class="header-text">
        Проходите регистрацию на нашем сайте как тренер, получайте личную карту
        с золотым статусом.
      </div>
      <div class="header-actions">
        <Button color="white-20" @click="router.push('/partner-register')"
          >Регистрация
        </Button>
        <Button color="white-20" @click="globalStore.toggleIsOpenAuthentication"
          >Вход
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'PartnersHeader';
</style>
