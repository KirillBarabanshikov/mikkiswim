<script setup lang="ts">
import B2BRegisterForm from '~/features/B2BRegisterForm/B2BRegisterForm.vue'
</script>

<template>
  <div class="page">
    <div class="page-content">
      <div class="logo"><img src="/img/B2B_page/b2b-logo.svg" alt="" /></div>
      <div class="container">
        <div class="title">
          <div class="subtitle">Регистрация</div>
          <div class="title-secondary"><span>B2B</span> сотрудничество</div>
        </div>
        <B2BRegisterForm />
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

      svg {
        width: 261px;
        height: 70px;
      }
    }

    .title {
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;

      .subtitle {
        color: var(--gray);
        font-weight: 700;
        font-size: 14px;
      }
    }

    span {
      color: var(--green);
    }
  }
}
</style>
