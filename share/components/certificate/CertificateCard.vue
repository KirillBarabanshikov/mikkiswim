<script setup lang="ts">
import type { Certificate } from '~/entities/certificate/model/Certificate'

import { useFormatPrice } from '../../utils/useFormatPrice'

defineProps<{
  certificate: Certificate
}>()

const {
  public: { API }
} = useRuntimeConfig()

const onClickCertificate = () => {}
</script>

<template>
  <div class="certificate" @click.stop="onClickCertificate">
    <div v-if="certificate.image" class="certificate-img">
      <img :src="API + certificate.image" alt="" />
    </div>
    <div class="certificate-body">
      <div class="certificate-subtitle">Цифровой товар</div>
      <div class="certificate-title">
        <span>{{ certificate.title }}</span>
      </div>
      <div class="certificate-price">
        <div class="certificate-price-current">
          {{ useFormatPrice(1500) }} ₽
        </div>
        <div :class="['certificate-fav']">
          <IconFavorite />
        </div>
      </div>
      <div class="certificate-description">Доставка на эл. почту или смс</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'CertificateCard';
</style>
