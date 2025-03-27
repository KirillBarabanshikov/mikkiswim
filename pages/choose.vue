<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <main class="page">
    <div class="content">
      <div class="content-bg">
        <img src="/img/choose_page/bg.webp" alt="" />
      </div>
      <div class="page-title">
        <svg
          width="1124"
          height="200"
          viewBox="0 0 1124 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color: #9fe2ff; stop-opacity: 1" />
              <stop offset="34%" style="stop-color: #a8f5ff; stop-opacity: 1" />
              <stop
                offset="60%"
                style="stop-color: #ebf8ff; stop-opacity: 0.65"
              />
              <stop
                offset="100%"
                style="stop-color: #d1f9ff; stop-opacity: 0.52"
              />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="190"
            fill="none"
            stroke="url(#gradient1)"
            stroke-width="3"
            class="title-text"
          >
            Почему выбирают нас
          </text>
        </svg>
      </div>
      <div class="page-title mobile">
        Почему<br />
        выбирают нас
      </div>
      <div class="page-list">
        <div class="item">
          <div class="item-img">
            <img src="/img/choose_page/img-1.webp" alt="" />
          </div>
          <div class="item-text">
            Лучшие ткани
            <span>Производство Италия</span>
          </div>
        </div>
        <div class="item">
          <div class="item-img">
            <img src="/img/choose_page/img-2.webp" alt="" />
          </div>
          <div class="item-text">
            Все товары прошли проверку и имеют
            <span>сертификаты качества</span>
          </div>
        </div>
        <div class="item">
          <div class="item-img">
            <img src="/img/choose_page/img-3.webp" alt="" />
          </div>
          <div class="item-text">
            Современные
            <span>лекала</span>
          </div>
        </div>
        <div class="item">
          <div class="item-img">
            <img src="/img/choose_page/img-4.webp" alt="" />
          </div>
          <div class="item-text">
            <span>Самые низкие цены</span>
            Самые низкие цены в плавательном сегменте
          </div>
        </div>
        <div class="item">
          <div class="item-img">
            <img src="/img/choose_page/img-5.webp" alt="" />
          </div>
          <div class="item-text">
            <span>Три коллекции</span>
            в год
          </div>
        </div>
        <div class="item">
          <div class="item-img">
            <img src="/img/choose_page/img-6.webp" alt="" />
          </div>
          <div class="item-text">
            <span>Высокая износостойкость</span>
            всех товаров
          </div>
        </div>
        <div class="item">
          <div class="item-img">
            <img src="/img/choose_page/img-7.webp" alt="" />
          </div>
          <div class="item-text inline">
            <span>Постоянные</span>
            скидки, Акции и розыгрыши
          </div>
        </div>
        <div class="item">
          <div class="item-img">
            <img src="/img/choose_page/img-8.webp" alt="" />
          </div>
          <div class="item-text inline">
            <span>Накопительные системы баллов</span>
            для постоянных клиентов
          </div>
        </div>
        <div class="item">
          <div class="item-img">
            <img src="/img/choose_page/img-9.webp" alt="" />
          </div>
          <div class="item-text inline">
            <span>Выгодные условия сотрудничества</span>
            для оптовых клиентов
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.page {
  .content {
    &-bg {
      position: absolute;
      z-index: -1;

      img {
        width: 100%;
        min-height: 700px;
        object-fit: cover;
      }
    }
  }

  &-title {
    display: flex;
    justify-content: center;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 16px;

    &.mobile {
      display: none;
    }

    .title-text {
      font-size: 150px;
      line-height: 150%;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-family: var(--font-second);
      color: transparent;
      position: relative;
      display: inline-block;
    }
  }

  &-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 36px 180px;
    max-width: 1140px;
    margin: 48px auto 108px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        color: var(--white);
      }

      &-img {
        max-width: 200px;
      }

      &-text {
        font-size: 20px;
        line-height: 155%;
        text-align: center;
        display: flex;
        flex-direction: column;

        &.inline {
          display: inline;
        }

        span {
          color: var(--blue);
          font-weight: 700;
        }
      }
    }
  }
}

@media (max-width: $md2 + px) {
  .page {
    &-list {
      gap: 32px 16px;
      margin: 24px auto 56px;
      padding: 0 16px;

      .item {
        &-text {
          font-size: 16px;
        }

        &-img {
          max-width: 160px;
        }
      }
    }
  }
}

@media (max-width: $md3 + px) {
  .page {
    .content {
      &-bg {
        img {
          min-height: 520px;
        }
      }
    }
    &-title {
      display: none;

      &.mobile {
        padding-top: 48px;
        display: block;
        font-size: 12vw;
        line-height: 100%;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        text-align: center;
        color: var(--white);
        font-family: var(--font-second);
      }
    }

    &-list {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;

      .item {
        &:first-child {
          grid-column: span 2;

          .item-img {
            max-width: 200px;
          }
        }

        &:nth-child(2),
        &:nth-child(3) {
          color: var(--black);
        }

        &-text {
          font-size: 14px;
        }

        &-img {
          max-width: 120px;
        }
      }
    }
  }
}
</style>
