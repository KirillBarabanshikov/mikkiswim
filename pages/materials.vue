<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <main class="page">
    <div class="content">
      <div class="content-bg">
        <img src="/img/materials_page/bg.webp" alt="" />
      </div>
      <div class="page-title">
        <svg
          width="740"
          height="300"
          viewBox="0 0 800 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color: #76d6ff; stop-opacity: 1" />
              <stop
                offset="19%"
                style="stop-color: #6aec87; stop-opacity: 0.74"
              />
              <stop
                offset="48%"
                style="stop-color: #6fffe5; stop-opacity: 0.9"
              />
              <stop
                offset="78%"
                style="stop-color: #d9ff9a; stop-opacity: 0.91"
              />
              <stop
                offset="100%"
                style="stop-color: #95ffd9; stop-opacity: 1"
              />
            </linearGradient>
          </defs>
          <text
            x="25"
            y="150"
            fill="none"
            stroke="url(#gradient1)"
            stroke-width="3"
            class="title-text"
          >
            Материалы
          </text>
        </svg>
      </div>
      <div class="page-list">
        <div class="item">
          <div class="item-img">
            <img src="/img/materials_page/img-1.webp" alt="" />
          </div>
          <div class="item-title">Экологичность</div>
          <div class="item-text">
            Экологичность всех продуктов проверяется на стадии закупки от наших
            поставщиков до стадии получения сертификатов качества на каждый
            продукт. Мы заботимся о вашем здоровье и безопасности
          </div>
        </div>
        <div class="item">
          <div class="item-img">
            <img src="/img/materials_page/img-2.webp" alt="" />
          </div>
          <div class="item-title">Комфорт</div>
          <div class="item-text">
            Все лекала разработаны с учетом отзывов о нашей продукции +
            постоянных тестов. Формы аксессуаров сделаны по последним тенденциям
            моды и стиля. Отвечают всем технологичным требованиям аэродинамики,
            эффективности, надежности и комфорта
          </div>
        </div>
        <div class="item">
          <div class="item-img">
            <img src="/img/materials_page/img-3.webp" alt="" />
          </div>
          <div class="item-title">Долговечность</div>
          <div class="item-text">
            Сбалансированный состав материала позволяет купальникам и боксером
            на протяжении сотен тренировок оставаться такими же плотными и
            яркими
          </div>
        </div>
      </div>
      <div class="page-text">
        Ткани для производства купальников и плавок мы заказываем
        <span>в Италии. Материал 70% ПБТ 30% полиэстер.</span> Данное сочетание
        тканей позволяет сделать купальник максимально комфортным долговечным и
        плотно прилегающем к телу. Нанесения принтов на купальник производится
        по современным стандартам качества (экологичность, максимальная яркость
        после сотен тренировок). Мы делаем товары максимально удобными и
        функциональными, чтобы вы получали удовольствие от тренировок с нами.
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
        min-height: 1000px;
        object-fit: cover;
      }
    }
  }

  &-title {
    display: flex;
    justify-content: center;

    .title-text {
      font-size: 200px;
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
    max-width: 1440px;
    margin: -150px auto 0;
    padding: 0 16px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-img {
        height: 408px;

        img {
          height: 100%;
          object-fit: cover;
        }
      }

      &-title {
        font-weight: 700;
        font-size: 36px;
        line-height: 150%;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        text-align: center;
        color: var(--white);
      }

      &-text {
        line-height: 155%;
        text-align: center;
        color: var(--white);
        margin-top: 24px;
        padding: 0 16px;
      }
    }
  }

  &-text {
    color: var(--white);
    max-width: 1440px;
    margin: 48px auto 164px;
    line-height: 155%;
    text-align: center;
    padding: 0 16px;

    span {
      font-weight: 700;
    }
  }
}

@media (max-width: $md2 + px) {
  .page {
    &-list {
      .item {
        &-img {
          height: 224px;
        }

        &-title {
          font-size: 20px;
        }

        &-text {
          font-size: 14px;
        }
      }
    }
  }
}

@media (max-width: $md3 + px) {
  .page {
    &-list {
      grid-template-columns: 1fr;

      .item {
        &-img {
          height: auto;
        }

        &-title {
          font-size: 30px;
        }

        &-text {
          font-size: 14px;
        }

        &:nth-child(2),
        &:nth-child(3) {
          .item-title {
            color: var(--black);
          }

          .item-text {
            color: var(--black);
          }
        }
      }
    }

    &-text {
      color: var(--black);
      margin: 24px auto 56px;
    }
  }
}
</style>
