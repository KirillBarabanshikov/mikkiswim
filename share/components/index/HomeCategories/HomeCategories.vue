<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

import Button from '~/share/UI/Button/index.vue'

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)
</script>

<template>
  <div class="categories">
    <!-- 1 строка -->
    <div class="item item-full">
      <img
        src="~/public/img/main_page/main_1.webp"
        alt="Новая коллекция"
        class="image"
      />
      <div class="content">
        <div class="title-large">New collection</div>
        <div class="subtitle">Summer 2022</div>
        <Button
          color="black-gradient"
          class="btn"
          @click="navigateTo('/catalog/new-collection')"
        >
          Смотреть
        </Button>
      </div>
    </div>

    <!-- 2 строка -->
    <div class="item">
      <img
        src="~/public/img/main_page/main_2.webp"
        alt="Бикини"
        class="image"
      />
      <div class="content">
        <div class="title-large">Бикини</div>
        <Button
          color="black-gradient"
          class="btn"
          @click="navigateTo('/catalog/bikini')"
        >
          Смотреть
        </Button>
      </div>
    </div>
    <div class="item">
      <img
        src="~/public/img/main_page/main_3.webp"
        alt="Слитые"
        class="image"
      />
      <div class="content">
        <div class="title-large">Слитные</div>
        <Button
          color="black-gradient"
          class="btn"
          @click="navigateTo('/catalog/slitnye')"
        >
          Смотреть
        </Button>
      </div>
    </div>
    <div class="item">
      <img
        src="~/public/img/main_page/main_4.webp"
        alt="Для детей"
        class="image"
      />
      <div class="content">
        <div class="title-large">Для детей</div>
        <Button
          color="black-gradient"
          class="btn"
          @click="navigateTo('/catalog/dlia-detei')"
        >
          Смотреть
        </Button>
      </div>
    </div>

    <!-- 3 строка -->
    <div class="item item-half">
      <img src="~/public/img/main_page/main_5.webp" alt="Очки" class="image" />
      <div class="content">
        <div class="title-large">Очки</div>
        <Button
          color="black-gradient"
          class="btn"
          @click="navigateTo('/catalog/ocki')"
        >
          Смотреть
        </Button>
      </div>
    </div>
    <div class="item">
      <img
        src="~/public/img/main_page/main_6.webp"
        alt="Без подписи"
        class="image"
      />
      <div class="content"></div>
    </div>

    <!-- 4 строка -->
    <div v-if="!isMobile" class="item">
      <img
        src="~/public/img/main_page/main_7.webp"
        alt="Для маужчин"
        class="image"
      />
      <div class="content">
        <div class="title-large">Для мужчин</div>
        <Button
          color="black-gradient"
          class="btn"
          @click="navigateTo('/catalog/dlia-muzcin')"
        >
          Смотреть
        </Button>
      </div>
    </div>
    <div class="item">
      <img
        src="~/public/img/main_page/main_8.webp"
        alt="Аксессуары"
        class="image"
      />
      <div class="content">
        <div class="title-large">Аксессуары</div>
        <Button
          color="black-gradient"
          class="btn"
          @click="navigateTo('/catalog/aksessuary')"
        >
          Смотреть
        </Button>
      </div>
    </div>
    <div class="item">
      <img
        src="~/public/img/main_page/main_9.webp"
        alt="Шапочки"
        class="image"
      />
      <div class="content">
        <div class="title-large">Шапочки</div>
        <Button
          color="black-gradient"
          class="btn"
          @click="navigateTo('/catalog/sapocki')"
        >
          Смотреть
        </Button>
      </div>
    </div>

    <!-- 5 строка -->
    <div v-if="!isMobile" class="item">
      <img
        src="~/public/img/main_page/main_10.webp"
        alt="Без подписи"
        class="image"
      />
    </div>
    <div class="item item-half">
      <img src="~/public/img/main_page/main_11.webp" alt="Худи" class="image" />
      <div class="content">
        <div class="title-large">Худи</div>
        <Button
          color="black-gradient"
          class="btn"
          @click="navigateTo('/catalog/xudi')"
        >
          Смотреть
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'HomeCategories' as *;
</style>
