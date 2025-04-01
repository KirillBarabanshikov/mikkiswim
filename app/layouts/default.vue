<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { useRoute, useRouter } from '#vue-router'
import { useGlobalStore } from '~/share/store/globalStore'
import Loader from '~/share/UI/Loader/Loader.vue'
import Authentication from '~/widgets/Authentication/Authentication.vue'
import Footer from '~/widgets/Footer/Footer.vue'
import GlobalCatalog from '~/widgets/GlobalCatalog/GlobalCatalog.vue'
import Header from '~/widgets/Header/Header.vue'
import Search from '~/widgets/Search/Search.vue'

const route = useRoute()
const router = useRouter()
const globalStore = useGlobalStore()

// Реактивная переменная для управления вариантом хедера
const currentHeaderVariant = ref<string | undefined>(undefined)

router.beforeEach((to, from, next) => {
  globalStore.isLoading = true
  next()
})

router.afterEach(() => {
  globalStore.isLoading = false
})

const blackHeaderRoutes = new Set([
  'contacts',
  'help',
  'about',
  'catalog',
  'catalog-slug-productSlug',
  'product',
  'basket',
  'search',
  'certificates',
  'certificates-id',
  'cabinet',
  'favorite',
  'vacancies-list',
  'b2b-catalog',
  'combinations-id'
])

const isProductPage = computed(() => !!route.params.productSlug)

const isHeaderVisible = computed(
  () =>
    ![
      'b2b',
      'b2bRegistration',
      'partnerRegistration',
      'partner-register',
      'b2b-register',
      'new-password'
    ].includes(route.name as string)
)

const isProductHeaderRoute = computed(() => !!route.params.productSlug)

const isCertificateHeaderRoute = computed(
  () =>
    route.path.startsWith('/certificates/') && !isNaN(Number(route.params.id))
)

const isCabinetHeaderRoute = computed(() => route.path.startsWith('/cabinet'))

// Функция для вычисления варианта хедера
const updateHeaderVariant = () => {
  console.log('Updating header variant for route:', route.path, route.name)
  if (isProductHeaderRoute.value) {
    currentHeaderVariant.value = 'transparent'
  } else if (isCertificateHeaderRoute.value) {
    currentHeaderVariant.value = 'transparent-black'
  } else if (isCabinetHeaderRoute.value) {
    currentHeaderVariant.value = 'profile-header'
  } else if (
    route.path === '/b2b/catalog' ||
    blackHeaderRoutes.has(route.name as string)
  ) {
    currentHeaderVariant.value = 'black'
  } else {
    currentHeaderVariant.value = undefined
  }
  console.log('Updated headerVariant:', currentHeaderVariant.value)
}

onMounted(() => {
  updateHeaderVariant()
  if (globalStore.isOpenAuthentication) {
    document.body.style.overflow = 'hidden'
  }
})

watch(
  () => route.path,
  () => {
    updateHeaderVariant()
  }
)

const isFooterVisible = computed(
  () =>
    ![
      'index',
      'cabinet',
      'b2b',
      'partnerRegistration',
      'b2bRegistration',
      'vacancies',
      'partner-register',
      'b2b-register',
      'vacancies-list',
      'new-password',
      'b2b-catalog'
    ].includes(route.name as string)
)

watch(
  () => globalStore.isOpenAuthentication,
  (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : ''
  }
)
</script>

<template>
  <div class="app">
    <!--    <Loader v-if="globalStore.isLoading" />-->

    <Header v-if="isHeaderVisible" :variant="currentHeaderVariant" />

    <GlobalCatalog />

    <Authentication />

    <Search />

    <NuxtPage />

    <Footer v-if="isFooterVisible" key="footer" />
  </div>
</template>

<style scoped lang="scss"></style>
