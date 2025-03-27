<script setup lang="ts">
import { useUserStore } from '~/share/store/userStore'

const userStore = useUserStore()

const isCopied = ref(false)

const copyText = ref('Скопировать')
const copyPromoCode = () => {
  const promoCode = userStore.user?.coachData.promoCode.promoCode || ''
  isCopied.value = true
  navigator.clipboard.writeText(promoCode).then(() => {
    copyText.value = 'Скопировано'
    setTimeout(() => {
      copyText.value = 'Скопировать'
      isCopied.value = false
    }, 3500)
  })
}
</script>

<template>
  <div class="promo">
    <div class="promo-wrapper">
      <div class="promo-header">Ваш промо-код</div>
      <div class="promo-content">
        <div class="code">
          {{ userStore.user?.coachData.promoCode.promoCode }}
        </div>
        <div class="copy" @click="copyPromoCode">
          <IconCopy v-if="!isCopied" />
          <IconCheck v-else />
          <p>{{ copyText }}</p>
        </div>
      </div>
      <div class="promo-discount">
        Дает скидку {{ userStore.user?.coachData.promoCode.percent }}%
      </div>
      <p>
        Делитесь промо-кодом и получайте 15% кэшбэка микки-коинами с каждой
        покупки
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'CoachPromocode';
</style>
