<script setup lang="ts">
import { navigateTo } from 'nuxt/app'

import { useAuthStore } from '~/share/store/authStore'
import { useGlobalStore } from '~/share/store/globalStore'
import { useUserStore } from '~/share/store/userStore'
import IconBasket from '~/share/UI/Icons/IconBasket.vue'
import IconFavorite from '~/share/UI/Icons/IconFavorite.vue'
import IconLogo from '~/share/UI/Icons/IconLogo.vue'
import IconMenu from '~/share/UI/Icons/IconMenu.vue'
import IconSearch from '~/share/UI/Icons/IconSearch.vue'
import IconUser from '~/share/UI/Icons/IconUser.vue'
import HeaderMenu from '~/widgets/Header/components/HeaderMenu/HeaderMenu.vue'

type HeaderVariant = 'black' | 'transparent' | 'transparent-black'

interface Props {
  variant?: HeaderVariant
}

defineProps<Props>()

const isB2BUser = computed(() => userStore.user?.userB2B)

const globalStore = useGlobalStore()
const userStore = useUserStore()
const authStore = useAuthStore()

const { lock, unlock } = useBodyLock()

const toggleMenu = () => {
  if (globalStore.isOpenMenu) {
    globalStore.toggleIsOpenMenu(false)
  } else {
    globalStore.toggleIsOpenMenu(true)
  }
}

const clickOverlay = () => {
  unlock()
  if (globalStore.isOpenMenu) globalStore.toggleIsOpenMenu(false)
  if (globalStore.isOpenSearch) globalStore.toggleIsOpenSearch()
  if (globalStore.isOpenAuthentication)
    globalStore.toggleIsOpenAuthentication(false)
  if (globalStore.isFilterMenuVisible) globalStore.toggleFilterMenu(false)
}

const clickProfile = () => {
  if (!userStore.user?.id) globalStore.toggleIsOpenAuthentication(true)
  else navigateTo('/cabinet?chapter=purchases')
}

const clickBasket = () => {
  navigateTo('/basket')
}

const clickSearch = () => {
  globalStore.toggleIsOpenSearch()
  lock()
}

const openB2BCabinet = () => {
  navigateTo('/cabinet?chapter=purchases')
}

const route = useRoute()

const isCabinetRoute = computed(() => route.path.startsWith('/cabinet'))

const clickFavorite = () => {
  navigateTo('/favorite')
}
</script>

<template>
  <client-only>
    <header v-if="isB2BUser" :class="['header', variant]">
      <div class="container">
        <div class="header-container b2b">
          <div
            class="header-burger"
            v-if="!isCabinetRoute"
            @click="openB2BCabinet"
          >
            <IconMenu />
          </div>
          <div class="header-logo b2b" @click="navigateTo('/b2b/catalog')">
            <img src="/img/B2B_page/b2b-logo.svg" alt="" />
          </div>
          <div class="header-actions">
            <div class="header-basket">
              <IconBasket />
            </div>
            <div class="header-logout">
              <IconLogout @click="authStore.logout()" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <header v-else :class="['header', variant]">
      <div class="container">
        <div class="header-container">
          <div class="header-burger" @click="toggleMenu">
            <IconMenu />
            <span>МЕНЮ</span>
          </div>
          <RouterLink to="/" class="header-logo">
            <IconLogo />
          </RouterLink>
          <ClientOnly>
            <div class="header-actions" v-if="!isB2BUser">
              <div class="header-search">
                <IconSearch @click="clickSearch" />
              </div>
              <div class="header-favorite">
                <IconFavorite @click="clickFavorite" />
              </div>
              <div class="header-user">
                <IconUser @click="clickProfile" />
              </div>
              <div class="header-basket">
                <IconBasket @click="clickBasket" />
              </div>
            </div>
          </ClientOnly>
        </div>
      </div>
      <transition name="menu">
        <HeaderMenu v-if="globalStore.isOpenMenu" @close-menu="toggleMenu" />
      </transition>
      <!--    <transition name="menu-right">-->
      <!--      <Basket v-if="globalStore.isOpenBasket" @close-basket="toggleBasket" />-->
      <!--    </transition>-->
      <Transition name="fade">
        <PageOverlay
          v-if="
            globalStore.isOpenMenu ||
            globalStore.isOpenBasket ||
            globalStore.isOpenSearch ||
            globalStore.isOpenAuthentication ||
            globalStore.isFilterMenuVisible
          "
          @on-click="clickOverlay"
        />
      </Transition>
    </header>
  </client-only>
</template>

<style scoped lang="scss">
@use 'Header';
</style>
