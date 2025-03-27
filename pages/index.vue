<script setup lang="ts">
import ShowRoomPopup from '~/features/ShowRoomPopup/ShowRoomPopup.vue'
import HomeAbout from '~/share/components/index/HomeAbout/HomeAbout.vue'
import HomeCategories from '~/share/components/index/HomeCategories/HomeCategories.vue'

definePageMeta({
  middleware: ['auth']
})

const isOpenShowRoomForm = ref(false)
const openShowroomForm = () => {
  isOpenShowRoomForm.value = !isOpenShowRoomForm.value
}

const closePopup = () => {
  isOpenShowRoomForm.value = false
}
</script>

<template>
  <div class="page">
    <HomeCategories />
    <HomeAbout @open-showroom-form="openShowroomForm" />
    <Modal :is-open="isOpenShowRoomForm" @close="openShowroomForm">
      <template #content>
        <ShowRoomPopup @close="closePopup" />
      </template>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.page {
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
}
</style>
