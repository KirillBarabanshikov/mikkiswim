<script setup lang="ts">
import IconCard from '~/share/UI/Icons/IconCard.vue'
import IconDelivery from '~/share/UI/Icons/IconDelivery.vue'
import IconReturn from '~/share/UI/Icons/IconReturn.vue'

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <main class="page">
    <div class="list">
      <div class="item">
        <div class="item-img">
          <IconDelivery />
        </div>
        <div class="item-title">Доставка</div>
        <div class="item-text">
          При оформлении заказа сроки и стоимость доставки рассчитываются на
          сайте автоматически. В среднем посылка прибывает в пункт назначения не
          более, чем за неделю.*
        </div>
        <div class="item-block">
          <div class="item-text">Отправляем посылку:</div>
          <div class="item-flex">
            <div class="item-text before">Почтой России</div>
            <div class="item-text before">Транспортной компанией СДЭК</div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-img">
          <IconCard />
        </div>
        <div class="item-title">Оплата</div>
        <div class="item-text">
          Оплатить посылку можно любым удобным для Вас способом: на сайте, при
          оформлении заказа, или при получении в отделении почты или СДЕК. При
          оформлении доставки с наложенным платежом вы можете сначала открыть
          посылку, проверить соответствие товара и лишь после этого оплатить
          покупку.
        </div>
        <div class="item-text">
          Оплата проходит через платежную платформу «ROBOKASSA». Это надежная
          система для проведения безопасных сделок. Если по какой-либо причине,
          вы решили оформить возврат, то платформа гарантирует покупателю
          возврат средств в полном объеме в течении 1-2 рабочих дней**.
        </div>
      </div>
      <div class="item">
        <div class="item-img">
          <IconReturn />
        </div>
        <div class="item-title">Возврат</div>
        <div class="item-text">
          Срок возврата товара надлежащего качества составляет 14 деней с
          момента получения товара. При том условии, что товар не находился в
          эксплуатации и сохранены все бирки и упаковка.
        </div>
        <div class="item-text">
          Причинами для возврата товара со стороны покупателя могут быть
          следующие:
        </div>
        <div class="icon-block">
          <div class="item-text before-s">
            не подошел размер, фасон, цвет, длина и т.п.;
          </div>
          <div class="item-text before-s">
            оттенок полученного товара отличается от оттенка модели с фотографии
            на сайте;
          </div>
          <div class="item-text before-s">
            изделие не соответствует заявленному качеству.
          </div>
        </div>
        <div class="item-text">
          Возврат товара осуществляется Почтой России, по адресу, указанному в
          контактах обратной связи. В случае возврата, все транспортные расходы
          покупатель берет на себя. Возврат денежных средств производится в
          полном объеме, за вычетом транспортных расходов.
        </div>
        <div class="item-text">
          Связаться с нами для оформления возврата можно с помощью контактов
          обратной связи.
        </div>
      </div>
      <div class="item">
        <div class="item-text">
          * Доставка в Европейские страны осуществляется на индивидуальных
          условиях. Сроки и стоимость доставки по миру уточняйте у менеджера
        </div>
        <div class="item-text">
          ** Возврат денежных средств осуществляется в течении 1-2 рабочих дней
          с момента получения продавцом возврата
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.page {
  padding: 96px 0;
}

.list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 100px;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;

  &-img {
    background: var(--gray-300);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 80px;
      height: 80px;
    }
  }

  &-title {
    font-weight: 700;
    font-size: 20px;
    text-align: center;
  }

  &-text {
    line-height: 155%;
    text-align: center;

    &.before {
      display: flex;
      align-items: center;
      gap: 12px;
      text-align: left;

      &:before {
        display: block;
        content: '';
        width: 10px;
        height: 10px;
        flex-shrink: 0;
        border-radius: 50%;
        background-color: var(--gray);
      }
    }

    &.before-s {
      display: flex;
      align-items: center;
      gap: 12px;
      text-align: left;

      &:before {
        display: block;
        content: '';
        width: 6px;
        height: 6px;
        flex-shrink: 0;
        border-radius: 50%;
        background-color: var(--gray);
      }
    }
  }

  &-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &-flex {
    display: flex;
    gap: 32px;
  }
}

@media (max-width: $md2 + px) {
  .page {
    padding: 96px 16px 64px;
  }
  .list {
    gap: 64px;
  }
}

@media (max-width: $md3 + px) {
  .page {
    padding: 72px 16px 56px;
  }
  .list {
    gap: 48px;
  }
  .item {
    &-img {
      width: 100px;
      height: 100px;

      svg {
        width: 60px;
        height: 60px;
      }
    }

    &-title {
      font-size: 16px;
    }

    &-text {
      font-size: 14px;
    }

    &-flex {
      flex-direction: column;
      gap: 6px;
    }
  }
}
</style>
