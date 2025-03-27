<script setup lang="ts">
import type { Refund } from '~/entities/refund/model/Refund'

const props = defineProps<{ refunds?: Refund }>()
const emit = defineEmits<{ (e: 'openForm'): void }>()
</script>

<template>
  <div class="refunds">
    <div class="refunds-title">Информация об условиях и сроках возврата</div>
    <div class="refunds-text center">
      Срок возврата товара надлежащего качества составляет 14 деней с момента
      получения товара. При том условии, что товар не находился в эксплуатации и
      сохранены все бирки и упаковка.
    </div>
    <div class="refunds-text">
      Причинами для возврата товара со стороны покупателя могут быть следующие:
      <div class="refunds-list">
        <div class="refunds-list-item">
          не подошел размер, фасон, цвет, длина и т.п.;
        </div>
        <div class="refunds-list-item">
          оттенок полученного товара отличается от оттенка модели с фотографии
          на сайте;
        </div>
        <div class="refunds-list-item">
          изделие не соответствует заявленному качеству.
        </div>
      </div>
    </div>
    <div class="refunds-text center">
      В случае возврата, все транспортные расходы покупатель берет на себя.
      Возврат денежных средств производится в полном объеме, за вычетом
      транспортных расходов.
    </div>
    <div class="refunds-title">Адрес возврата товара</div>
    <div class="refunds-flex">
      <div class="item">
        <div class="refunds-text">
          <div class="refunds-subtitle">Почта России:</div>
          <div class="refunds-list">
            <div class="refunds-list-item">
              129281, г. Москва, ул. Лётчика Бабушкина, д. 38 к2
            </div>
            <div class="refunds-list-item">Эсаулова Ольга Олеговна</div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="refunds-text">
          <div class="refunds-subtitle">СДЭК:</div>
          <div class="refunds-list">
            <div class="refunds-list-item">
              г. Мытищи, ул. Шараповский пр. с 7
            </div>
            <div class="refunds-list-item">Эсаулова Ольга Олеговна</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!refunds || refunds.length === 0">
      <div>У вас нет возвращаемых заказов</div>
    </div>
    <div class="refunds-action">
      <Button @click="$emit('openForm')">Оформить возврат</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'RefundInfo';
</style>
