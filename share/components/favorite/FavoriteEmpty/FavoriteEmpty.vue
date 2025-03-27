<script setup lang="ts"></script>

<template>
  <article class="list-info">
    <section class="info-icon">
      <IconFavorite />
    </section>
    <section class="info-main">
      <strong> У вас нет любимых товаров </strong>
    </section>
    <section class="info-auth">
      <p>Посмотрите новинки на нашем сайте, наверняка вам что-то понравится</p>
    </section>
    <section class="info-actions">
      <Button variant="black">Смотреть новинки</Button>
    </section>
  </article>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.list {
  &-info {
    max-width: 262px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 20px;
    gap: 36px;
    transition: 0.3s all ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }
}

.info {
  &-icon {
    width: 100%;
    height: 100%;
    max-width: 64px;
    max-height: 64px;
    color: var(--red);
  }

  &-main {
    font-size: 16px;
    @media (max-width: $md1 + px) {
      font-size: 13px;
    }
  }

  &-auth {
    font-size: 15px;
    @media (max-width: $md1 + px) {
      font-size: 13px;
    }
  }

  &-actions {
    text-decoration: underline;
    font-size: 16px;
    @media (max-width: $md1 + px) {
    }
  }
}
</style>
