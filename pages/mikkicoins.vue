<script setup lang="ts">
import MikkicoinsAccordion from '~/share/components/mikkicoins/MikkicoinsAccordion/MikkicoinsAccordion.vue'
import MikkicoinsContent from '~/share/components/mikkicoins/MikkicoinsContent/MikkicoinsContent.vue'
import MikkicoinsHeader from '~/share/components/mikkicoins/MikkicoinsHeader/MikkicoinsHeader.vue'

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="page">
    <MikkicoinsHeader />
    <MikkicoinsContent />
    <MikkicoinsAccordion />
  </div>
</template>

<style scoped lang="scss"></style>
