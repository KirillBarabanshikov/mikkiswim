<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <main class="page">
    <div class="page-content">
      <h1 class="title">О компании</h1>
      <div class="text">
        Компания MIKKISWIM была основана в 2017 году, мастером спорта
        международного класса Анастасией Горбуновой.
      </div>
      <div class="text">
        Первая коллекция купальников была выпущена в октябре 2017 года. Тогда
        Анастасия была и дизайнером, и менеджером, и директором, и рабочим на
        складе компании. Сегодня над созданием коллекции работает большая
        команда специалистов.
      </div>
      <div class="text">
        «Большую часть своей спортивной карьеры я посвятила плаванию. Как и все,
        я столкнулась с проблемой: отсутствие качественной, надежной, недорогой
        и удобной экипировки для профессионалов.»
      </div>
      <div class="subtitle">(с) Анастасия Горбунова</div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.page {
  padding: 130px 0 175px;
  text-align: center;

  &-content {
    display: flex;
    flex-direction: column;
    gap: 48px;
    max-width: 800px;
    margin: 0 auto;
  }
}

.title {
  font-family: var(--font-second);
  font-size: 55px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.text {
  line-height: 155%;
}

.subtitle {
  font-weight: 700;
  line-height: 155%;
}

// Максимальная ширина 1260
@media (max-width: #{$md2 + px}) {
  .page {
    padding: 96px 16px 110px;
  }
}

// Максимальная ширина 767
@media (max-width: #{$md3 + px}) {
  .page {
    padding: 96px 16px 56px;

    &-content {
      gap: 36px;
    }
  }
  .title {
    color: var(--yellow);
  }
  .text {
    font-size: 14px;
  }
}
</style>
