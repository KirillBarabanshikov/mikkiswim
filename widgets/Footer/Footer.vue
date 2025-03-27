<script setup lang="ts">
import { useGlobalStore } from '~/share/store/globalStore'
import IconIG from '~/share/UI/Icons/IconIG.vue'
import IconVK from '~/share/UI/Icons/IconVK.vue'

// @click="globalStore.toggleIsOpenCatalog"

type FooterVariant = 'white'

interface Props {
  variant?: FooterVariant
}

defineProps<Props>()
const globalStore = useGlobalStore()
</script>

<template>
  <footer :class="['footer', variant]">
    <div class="footer-container">
      <nav class="footer-menu">
        <NuxtLink to="/" class="footer-link">Главная</NuxtLink>
        <div class="footer-link" @click="globalStore.toggleIsOpenCatalog">
          Каталог
        </div>
        <NuxtLink to="/mikkicoins" class="footer-link">Mikkicoins</NuxtLink>
        <NuxtLink to="/contacts" class="footer-link">Контакты</NuxtLink>
        <NuxtLink to="/help" class="footer-link">Помощь</NuxtLink>
        <NuxtLink to="/about" class="footer-link">О компании</NuxtLink>
        <NuxtLink to="/b2b" class="footer-link">B2B</NuxtLink>
        <NuxtLink to="/partners" class="footer-link">
          Сотрудничество с тренерами
        </NuxtLink>
        <NuxtLink to="/choose" class="footer-link">
          Почему выбирают нас
        </NuxtLink>
        <NuxtLink to="/materials" class="footer-link">Материалы</NuxtLink>
        <NuxtLink to="/" class="footer-link">Вакансии</NuxtLink>
      </nav>
      <div class="footer-socials">
        <div class="footer-social">
          <IconVK />
        </div>
        <div class="footer-social">
          <IconIG />
        </div>
      </div>
      <div class="footer-description">© 2020-2023 Mikkiswim</div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use 'Footer';
</style>
