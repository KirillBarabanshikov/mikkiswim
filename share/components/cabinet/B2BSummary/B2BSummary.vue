<script setup lang="ts">
import { useUserStore } from '~/share/store/userStore'

const userStore = useUserStore()
</script>

<template>
  <article class="summary">
    <h3>
      {{ userStore.user?.userB2B.companyName }}
    </h3>
    <section class="info">
      <div class="column">
        <p class="info-item">
          {{
            userStore.user?.userB2B.mailingAddress +
            ', ' +
            userStore.user?.userB2B.legalAddress
          }}
        </p>
        <p class="info-item">
          {{ userStore.user?.userB2B.bankName }}
        </p>
        <p class="info-item">ОГРН {{ userStore.user?.userB2B.ogrn }}</p>
        <p class="info-item">ИНН {{ userStore.user?.userB2B.inn }}</p>
        <p class="info-item">{{ userStore.user?.userB2B.ceoName }}</p>
        <p class="info-item">{{ userStore.user?.userB2B.companySite }}</p>
      </div>
      <div class="column">
        <p class="info-item">{{ userStore.user?.userB2B.bankAddress }}</p>
        <p class="info-item">{{ userStore.user?.userB2B.legalAddress }}</p>
        <p class="info-item">
          Р/C {{ userStore.user?.userB2B.paymentAccount }}
        </p>
        <p class="info-item">
          К/C {{ userStore.user?.userB2B.correspondentAccount }}
        </p>
        <p class="info-item">{{ userStore.user?.userB2B.companyPhone }}</p>
        <p class="info-item">{{ userStore.user?.userB2B.companyEmail }}</p>
      </div>
    </section>
  </article>
</template>

<style scoped lang="scss">
@use 'B2BSummary';
</style>
