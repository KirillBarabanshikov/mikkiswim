<script setup lang="ts">
import PartnerRegisterForm from '~/features/PartnerRegisterForm/PartnerRegisterForm.vue'

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="page">
    <div class="page-content">
      <div class="logo"><img src="/img/cooperation.webp" alt="" /></div>
      <div class="container">
        <div class="title">
          <div class="subtitle">Регистрация</div>
          <p>Сотрудничество <span>с тренерами</span></p>
        </div>
        <PartnerRegisterForm />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.page {
  display: flex;
  justify-content: center;
  height: 100vh;

  &-content {
    margin-top: 26px;
    margin-bottom: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      margin-bottom: 26px;

      img {
        width: 228px;
        height: 50px;
      }
    }

    .title {
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;

      span {
        color: var(--blue);
      }

      .subtitle {
        color: var(--gray);
        font-weight: 700;
        font-size: 14px;
      }
    }
  }
}
</style>
