<script setup lang="ts">
import PartnersContent from '~/share/partners/PartnersContent/PartnersContent.vue'
import PartnersHeader from '~/share/partners/PartnersHeader/PartnersHeader.vue'

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="page">
    <PartnersHeader />
    <PartnersContent />
  </div>
</template>

<style scoped lang="scss"></style>
