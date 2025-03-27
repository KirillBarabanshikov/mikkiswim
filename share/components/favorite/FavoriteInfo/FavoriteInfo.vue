<script setup lang="ts">
import { useGlobalStore } from '~/share/store/globalStore'

const globalStore = useGlobalStore()
</script>

<template>
  <article class="list-info">
    <section class="info-icon">
      <IconFavorite />
    </section>
    <section class="info-main">
      <strong>
        Ваши любимые товары будут храниться в течение ограниченного времени
      </strong>
    </section>
    <section class="info-auth">
      <p>
        Зарегистрируйтесь или войдите в свою учетную запись, и мы сохраним ваши
        любимые товары, чтобы вы могли просматривать их с различных устройств.
      </p>
    </section>
    <section class="info-actions">
      <strong @click="globalStore.toggleIsOpenAuthentication(true)">
        Войти в учетную запись<br />
        или зарегистрироваться
      </strong>
    </section>
  </article>
</template>

<style scoped lang="scss">
@use 'FavoriteInfo';
</style>
