<script setup lang="ts">
import { useGlobalStore } from '~/share/store/globalStore'

const globalStore = useGlobalStore()

onMounted(() => {
  setTimeout(() => {
    globalStore.toggleIsOpenAuthentication(true)
  }, 100)
})
</script>

<template>
  <div class="page">
    <div class="page-background">
      <img src="/img/B2B_page/bg.png" alt="" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  &-background {
    width: 100%;
    height: 100vh;
    img {
      object-fit: cover;
    }
  }
}
</style>
