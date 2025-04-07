<script setup lang="ts">
import { navigateTo, useNuxtApp } from 'nuxt/app'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

import { useAuthStore } from '~/share/store/authStore'
import { useGlobalStore } from '~/share/store/globalStore'
import { useUserStore } from '~/share/store/userStore'
import IconBasket from '~/share/UI/Icons/IconBasket.vue'
import IconFavorite from '~/share/UI/Icons/IconFavorite.vue'
import IconLogo from '~/share/UI/Icons/IconLogo.vue'
import IconLogout from '~/share/UI/Icons/IconLogout.vue'
import IconMenu from '~/share/UI/Icons/IconMenu.vue'
import IconSearch from '~/share/UI/Icons/IconSearch.vue'
import IconUser from '~/share/UI/Icons/IconUser.vue'
import HeaderMenu from '~/widgets/Header/components/HeaderMenu/HeaderMenu.vue'

type HeaderVariant = 'black' | 'transparent' | 'transparent-black'

interface Props {
  variant?: HeaderVariant
}

defineProps<Props>()

const { $apiUrl } = useNuxtApp()
const authStore = useAuthStore()
const userStore = useUserStore()
const globalStore = useGlobalStore()

const { isAuthenticated } = storeToRefs(authStore)
const { user } = storeToRefs(userStore)

const isB2BUser = computed(() => user.value?.userB2B ?? false)
const isLoading = ref(true)

onBeforeMount(async () => {
  if (!isAuthenticated.value && authStore.refreshTokenCookie) {
    console.log('Синхронизация состояния хедера...')
    const refreshResult = await authStore.refreshAccessToken($apiUrl)
    if (refreshResult.success && !user.value?.id) {
      await userStore.fetchUser($apiUrl)
    }
  }
  isLoading.value = false
})

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
  if (!user.value?.id) globalStore.toggleIsOpenAuthentication(true)
  else navigateTo('/cabinet?chapter=purchases')
}

const clickBasket = () => {
  if (!isAuthenticated.value) {
    globalStore.toggleIsOpenAuthentication(true)
  } else {
    navigateTo(isB2BUser.value ? '/b2b/basket' : '/basket')
  }
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
    <template v-if="!isLoading">
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
              <img src="/img/B2B_page/b2b-logo.svg" alt="B2B Logo" />
            </div>
            <div class="header-actions">
              <div class="header-basket">
                <IconBasket @click="navigateTo('/b2b/basket')" />
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
            <div class="header-actions">
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
          </div>
        </div>
        <transition name="menu">
          <HeaderMenu v-if="globalStore.isOpenMenu" @close-menu="toggleMenu" />
        </transition>
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
    </template>
  </client-only>
</template>

<style scoped lang="scss">
@use 'Header';
</style>
