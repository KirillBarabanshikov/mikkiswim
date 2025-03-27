<script setup lang="ts">
import { useUserStore } from '~/share/store/userStore'

const userStore = useUserStore()
</script>

<template>
  <article class="summary">
    <h3>
      {{
        (userStore.user?.name ?? 'Имя') +
        ' ' +
        (userStore.user?.surname ?? 'Фамилия')
      }}
    </h3>
    <section class="info">
      <div class="column">
        <p class="info-item">{{ userStore.user?.email }}</p>
        <p class="info-item">
          {{ userStore.user?.phone ?? 'Не указан номер телефона' }}
        </p>
        <p class="info-item">
          {{ userStore.user?.postcode ?? 'Не указан почтовый индекс' }}
        </p>
        <p class="info-item">
          {{ userStore.user?.region ?? 'Не указан регион' }}
        </p>
      </div>
      <div class="column">
        <p class="info-item">{{ userStore.user?.city ?? 'Не указан город' }}</p>
        <p class="info-item">
          {{ userStore.user?.street ?? 'Не указана улица' }}
        </p>
        <p class="info-item">
          {{ userStore.user?.houseNumber ?? 'Не указан номер дома' }}
        </p>
        <p
          class="info-item"
          v-if="userStore.user?.apartment ?? 'Не указан номера телефона'"
        >
          {{ userStore.user?.houseNumber ?? 'Не указана квартира' }}
        </p>
      </div>
    </section>
  </article>
</template>

<style scoped lang="scss">
@use 'SummaryInfo';
</style>
