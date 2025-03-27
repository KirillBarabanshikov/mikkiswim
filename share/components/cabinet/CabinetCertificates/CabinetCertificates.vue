<script setup lang="ts">
import CertificateActivation from '~/features/ProfileForms/ActivateCertficateForm/ActivateCertficateForm.vue'

const emit = defineEmits<{ (e: 'success-activation', price: number): void }>()

const successActivation = (price: number) => {
  emit('success-activation', price)
}
</script>

<template>
  <CertificateActivation @success="successActivation" />
</template>

<style scoped lang="scss"></style>
