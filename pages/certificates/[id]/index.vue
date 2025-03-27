<script setup lang="ts">
import { useRoute } from '#vue-router'
import CertificateForm from '~/features/CertificateForm/CertificateForm.vue'
import { getCertificate } from '~/share/api/certificate'

const route = useRoute()

const {
  public: { API }
} = useRuntimeConfig()

const { data } = await useAsyncData('certificates', () =>
  getCertificate(route.params.id.toString())
)

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="page">
    <div class="page-container container">
      <div class="page-content">
        <div class="page-title">Выбор оформления</div>
        <div class="page-image">
          <img :src="API + data?.image" alt="" />
        </div>
        <div class="page-title">Описание</div>
        <div
          v-if="data?.description"
          class="page-description"
          v-html="data.description"
        ></div>
      </div>
      <div class="page-side">
        <div class="page-title">Mikki Сертификат</div>
        <CertificateForm />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'CertificatePage';
</style>
