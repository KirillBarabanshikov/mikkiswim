<script setup lang="ts">
import ShowRoomPopup from '~/features/ShowRoomPopup/ShowRoomPopup.vue'
import Button from '~/share/UI/Button/index.vue'
import Footer from '~/widgets/Footer/Footer.vue'

const emit = defineEmits(['open-showroomForm'])
</script>

<template>
  <section class="about">
    <div class="about-coins">
      <video
        src="~/public/img/main_mikki/mikki_video.webm"
        playsinline
        muted
        autoplay
        loop
      ></video>
    </div>
    <div class="about-container">
      <div class="about-section">
        <div class="title-large">Миккикоины</div>
        <div class="subtitle">
          Копи баллы и оплачивай покупки!
          <span>
            Бонусная система для&nbsp;тренеров&nbsp;и&nbsp;спортсменов
          </span>
        </div>
        <Button color="white-gradient">Подробнее</Button>
      </div>
      <div class="about-section">
        <div class="title-large">Шоурум в москве</div>
        <div class="subtitle">
          Ул. Енисейская, дом 46 К2, 1&nbsp;подъезд, 2 этаж, офис 214
        </div>
        <Button
          @click="$emit('open-showroomForm')"
          color="white-gradient"
          :style="{ color: 'var(--blue)' }"
        >
          Записаться
        </Button>
        <Modal>
          <ShowRoomPopup />
        </Modal>
      </div>
      <div class="about-section">
        <div class="subtitle">
          Хотите сделать красивый и&nbsp;стильный подарок?
        </div>
        <div class="title-large">Подарочный сертификат - идеальное решение</div>

        <Button
          @click="navigateTo('/certificates')"
          color="white-gradient"
          :style="{ color: 'var(--blue)' }"
        >
          Подробнее
        </Button>
      </div>
    </div>
    <Footer variant="white" />
  </section>
</template>

<style lang="scss" scoped>
@use 'HomeAbout' as *;
</style>
