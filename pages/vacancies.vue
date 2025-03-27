<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToVacancies = () => {
  router.push('/vacancies-list')
}

const { width } = useWindowSize()

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <main class="page">
    <div class="page-bg">
      <img
        v-if="width > 1240"
        class="desktop"
        src="~/public/img/vacancies_page/bg.png"
        alt=""
      />
      <img
        v-else-if="width < 1240"
        class="laptop"
        src="~/public/img/vacancies_page/bg-laptop.png"
        alt=""
      />
      <img
        v-if="width < 768"
        class="mobile"
        src="~/public/img/vacancies_page/bg-mobile.png"
        alt=""
      />
    </div>
    <div>
      <div class="page-content">
        <div class="title">Мы будем рады с вами сотрудничать!</div>
        <div class="subtitle">
          Наша команда постоянно растет и мы ищем новых сотрудников
        </div>
        <Button class="btn" color="white-20" @click="goToVacancies"
          >Смотреть вакансии
        </Button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.page {
  display: flex;
  align-items: center;
  max-width: 1720px;
  height: 100vh;

  &-bg {
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      //&.laptop {
      //  display: none;
      //}
      //
      //&.mobile {
      //  display: none;
      //}
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    max-width: 740px;
    padding-left: 96px;
  }
}

.title {
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 48px;
  line-height: 150%;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--white);
}

.subtitle {
  font-weight: 400;
  font-size: 20px;
  line-height: 155%;
  color: var(--white);
  margin-top: 8px;
}

.btn {
  max-width: 241px;
  margin-top: 48px;
}

// Максимальная ширина 1260
@media (max-width: #{$md2 + px}) {
  .page {
    justify-content: center;
    align-items: flex-start;
    padding: 100px;
  }

  .page-content {
    padding: 0;
    flex-direction: column;
    text-align: center;

    //&-bg {
    //  img {
    //    &.desktop {
    //      display: none;
    //    }
    //
    //    &.laptop {
    //      display: block;
    //    }
    //  }
    //}

    &-content {
      justify-content: center;
      align-items: flex-start;
      text-align: center;
      margin-top: 160px;
      padding-left: 0;
    }

    .title {
      font-size: 36px;
    }

    .subtitle {
      font-size: 16px;
      margin: 8px auto;
    }

    .btn {
      margin: 48px auto;
      width: 224px;
    }
  }
}

// Максимальная ширина 767
@media (max-width: #{$md3 + px}) {
  .page {
    justify-content: center;
  }
  .page-content {
    padding: 0;
    flex-direction: column;
    padding: 16px;
    text-align: center;
    max-width: 360px;

    //&-bg {
    //  img {
    //    &.laptop {
    //      display: none;
    //    }
    //
    //    &.mobile {
    //      display: block;
    //    }
    //  }
    //}

    &-content {
      justify-content: center;
      align-items: flex-start;
      text-align: center;
      margin-top: 80px;
      padding-left: 0;
    }

    .title {
      font-size: 24px;
    }

    .subtitle {
      font-size: 13px;
      margin: 8px auto;
    }

    .btn {
      min-width: 100%;
    }
  }
}
</style>
