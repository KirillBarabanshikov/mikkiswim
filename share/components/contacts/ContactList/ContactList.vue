<script setup lang="ts">
import IconEmail from '~/share/UI/Icons/IconEmail.vue'
import IconPhone from '~/share/UI/Icons/IconPhone.vue'
import IconPoint from '~/share/UI/Icons/IconPoint.vue'
</script>

<template>
  <div class="list">
    <div class="item">
      <div class="item-title">Контакты</div>
      <div class="text">
        <div class="text-img">
          <IconPoint />
        </div>
        г. Москва, ул. Енисейская дом 46 к 2, 1 подъезд, 2 этаж, офис 214
      </div>
      <div class="text">
        <div class="text-img">
          <IconPhone />
        </div>
        +7 (977) 334-03-59
      </div>
      <div class="text">
        <div class="text-img">
          <IconEmail />
        </div>
        mikkiswim@mail.ru
      </div>
    </div>
    <div class="item">
      <div class="item-title">Юридический адрес</div>
      <div class="text before">
        129281, г. Москва, ул. Енисейская, д. 46к2, 1 подъезд, 2 этаж, офис 214
      </div>
      <div class="text before">ОГРН 317583500055621</div>
      <div class="text before">ИНН 5836908066908</div>
    </div>
    <div class="item">
      <div class="item-title">Адрес возврата товара</div>
      <div class="item-block">
        <div class="subtitle">Почта России:</div>
        <div class="text before">
          129281, г. Москва, ул. Лётчика Бабушкина, д. 38 к2
        </div>
        <div class="text before">Эсаулова Ольга Олеговна</div>
      </div>
      <div class="item-block">
        <div class="subtitle">СДЭК:</div>
        <div class="text before">г. Мытищи, ул. Шараповский пр. с 7</div>
        <div class="text before">Эсаулова Ольга Олеговна</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'ContactList';
</style>
