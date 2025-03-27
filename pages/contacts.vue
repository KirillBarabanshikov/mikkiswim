<script setup lang="ts">
import ContactList from '~/share/components/contacts/ContactList/ContactList.vue'
import ContactMap from '~/share/components/contacts/ContactMap/ContactMap.vue'

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <main class="page">
    <ContactList />
    <ContactMap />
  </main>
</template>

<style lang="scss" scoped></style>
