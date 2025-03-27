<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import { RouteLocationRaw, useRouter } from 'vue-router'

import { useGlobalStore } from '~/share/store/globalStore'
import { useUserStore } from '~/share/store/userStore'
import IconArrowRight from '~/share/UI/Icons/IconArrowRight.vue'

const userStore = useUserStore()

const emit = defineEmits<{
  (e: 'closeMenu'): void
}>()
const router = useRouter()
// const sessionStore = useSessionStore()
const globalStore = useGlobalStore()
const onChangeRoute = (route: RouteLocationRaw) => {
  router.push(route)
  emit('closeMenu')
}
const openSearch = () => {
  globalStore.toggleIsOpenSearch()
  emit('closeMenu')
}

const onAuthorization = () => {
  if (!userStore.user?.id) {
    globalStore.toggleIsOpenAuthentication(true)
    globalStore.toggleIsOpenMenu(false)
  } else {
    navigateTo('/cabinet?chapter=purchases')
    globalStore.toggleIsOpenMenu(false)
  }
}
</script>

<template>
  <nav class="menu">
    <div class="menu-container">
      <div class="menu-header">
        <div @click="onChangeRoute('/')" class="menu-logo">
          <IconLogo />
        </div>
        <div @click="emit('closeMenu')" class="menu-close">
          <IconClose />
        </div>
      </div>
      <div class="menu-nav">
        <div @click="openSearch" class="link">
          <div class="link-icon">
            <IconSearch />
          </div>
          <div class="link-title">Поиск</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onAuthorization" class="link">
          <div class="link-icon">
            <IconUser />
          </div>
          <div class="link-title">Личный кабинет</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/favorite')" class="link">
          <div class="link-icon">
            <IconFavorite />
          </div>
          <div class="link-title">Избранное</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/basket')" class="link">
          <div class="link-icon">
            <IconBasket />
          </div>
          <div class="link-title">Корзина</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/')" class="link link-border">
          <div class="link-title">Главная</div>
        </div>
        <div @click="globalStore.toggleIsOpenCatalog" class="link link-border">
          <div class="link-title">Каталог</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/mikkicoins')" class="link link-border">
          <div class="link-title">Mikkicoins</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/certificates')" class="link link-border">
          <div class="link-title">Сертификаты</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/contacts')" class="link link-border">
          <div class="link-title">Контакты</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/help')" class="link link-border">
          <div class="link-title">Помощь</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/about')" class="link link-border">
          <div class="link-title">О компании</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/b2b')" class="link link-border">
          <div class="link-title">B2B</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/partners')" class="link link-border">
          <div class="link-title">Сотрудничество с тренерами</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/choose')" class="link link-border">
          <div class="link-title">Почему выбирают нас</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/materials')" class="link link-border">
          <div class="link-title">Материалы</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
        <div @click="onChangeRoute('/vacancies')" class="link link-border">
          <div class="link-title">Вакансии</div>
          <div class="link-arrow">
            <IconArrowRight />
          </div>
        </div>
      </div>
      <div class="menu-footer">
        <div class="menu-socials">
          <div class="social">
            <IconVK />
          </div>
          <div class="social">
            <IconIG />
          </div>
        </div>
        <div class="menu-description">© 2020-2023 Mikkiswim</div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use 'HeaderMenu';
</style>
