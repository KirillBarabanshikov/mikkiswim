<script setup lang="ts">
import { useRouter } from 'vue-router'

import { getCertificates } from '~/share/api/certificate'
import CertificateCard from '~/share/components/certificate/CertificateCard.vue'

const { data } = await useAsyncData('certificates', getCertificates)

const router = useRouter()

const setActiveCertificate = (id: number) => {
  console.log(id)
  router.push({ name: 'certificates-id', params: { id } })
}
definePageMeta({
  middleware: ['auth'],
  ssr: true
})
</script>

<template>
  <div class="page">
    <div class="page-container container">
      <div class="page-header">
        <div class="page-catalog">Mikki сертификаты</div>
        <div class="page-filter">
          <div class="page-filter-grid">
            <span>Вид</span>
            <div class="grids">
              <div :class="['item']">2</div>
              <div :class="['item']">4</div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-content">
        <div :class="['page-list']">
          <CertificateCard
            v-for="certificate in data"
            :key="certificate.id"
            :certificate="certificate"
            @click="setActiveCertificate(certificate.id)"
          />
          <!--          <SkeletonCard v-for="n in 4" :key="n" />-->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'CertificatesPage';
</style>
