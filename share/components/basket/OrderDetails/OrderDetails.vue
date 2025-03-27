<script setup lang="ts">
import { computed, ref } from 'vue'

import type { Cart } from '~/entities/cart/model/Cart'
import BasketCard from '~/share/components/basket/BasketCard/BasketCard.vue'
import BasketPromo from '~/share/components/basket/BasketPromo/BasketPromo.vue'
import { useCartStore } from '~/share/store/cartStore'
import { priceFormatter } from '~/share/utils/priceFormatter'
import { useSizeWindow } from '~/share/utils/useSizeWindow'

const { deviceSize } = useSizeWindow()
const props = defineProps<{ items: Cart[] }>()
const [open, toggleOpen] = useToggle()
const cartStore = useCartStore()
const statusPromo = ref(false)
const promoDiscount = ref(0)
const promoPercent = ref(0)
const promoActivated = computed(() => promoDiscount.value > 0)
const isMobileView = computed(() => deviceSize.value < DeviceSize.TABLET)

const emit = defineEmits(['nextStep', 'checkout'])

const totalPriceWithoutDiscount = computed(() =>
  props.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
)

const totalPriceOld = computed(() =>
  props.items.reduce(
    (sum, item) => sum + item.product.oldPrice * item.quantity,
    0
  )
)

const discountPrice = computed(() =>
  props.items.reduce(
    (sum, item) =>
      sum + (item.product.oldPrice - item.product.price) * item.quantity,
    0
  )
)

const updatePromoDiscount = (percent: number) => {
  promoPercent.value = percent
  promoDiscount.value = Math.round(
    (totalPriceWithoutDiscount.value * percent) / 100
  )
}

const finalPrice = computed(() =>
  priceFormatter(totalPriceWithoutDiscount.value - promoDiscount.value)
)

const setOrder = () => {
  if (isMobileView.value) {
    emit('checkout')
  } else {
    emit('nextStep')
  }
}
</script>

<template>
  <section v-if="deviceSize > DeviceSize.TABLET" class="basket-container">
    <div class="basket-header">
      <div class="basket-title">Детали заказа</div>
    </div>
    <div v-if="cartStore.items.length" :class="['basket-list', { open: open }]">
      <BasketCard v-for="item in items" :key="item.product.id" :item="item" />
    </div>
    <div
      v-if="cartStore.items.length > 2"
      :class="['basket-open', { open: open }]"
      @click="toggleOpen()"
    >
      {{ open ? 'Свернуть' : 'Развернуть' }}
      <IconArrowDown />
    </div>
    <div class="basket-promo">
      <BasketPromo v-model:status="statusPromo" @apply="updatePromoDiscount" />
      <div v-if="promoActivated" class="promo-success">
        <div class="promo-success-text">
          <IconSuccess class="promo-success-icon" />
          <p class="promo-success-text">Промокод успешно активирован!</p>
        </div>
        <p class="promo-success-discount">
          Скидка {{ promoPercent }}% на все товары в корзине
        </p>
      </div>
    </div>
    <div class="basket-order">
      <span>Ваш заказ</span>
      <div class="item">
        Товары ({{ cartStore.items.length }})
        <span>{{ priceFormatter(totalPriceOld) }}</span>
      </div>
      <div class="item">
        Скидка на товар
        <span class="red">-{{ priceFormatter(discountPrice) }}</span>
      </div>
      <div v-if="promoDiscount > 0" class="item green">
        Скидка по промо-коду <span>-{{ priceFormatter(promoDiscount) }}</span>
      </div>
    </div>
    <div class="basket-total">
      Итого <span>{{ finalPrice }}</span>
    </div>
    <div class="basket-mikki">
      Начислим миккикоинов
      <span
        >{{ Math.round((totalPriceWithoutDiscount - promoDiscount) * 0.05)
        }}<IconMikki
      /></span>
    </div>
    <div class="basket-action">
      <Button variant="black" size="small" block @click="setOrder">
        Далее
      </Button>
    </div>
  </section>
  <section v-else class="basket-container">
    <div class="basket-header">
      <div class="basket-title">Детали заказа</div>
    </div>
    <div v-if="cartStore.items.length" :class="['basket-list', { open: open }]">
      <BasketCard v-for="item in items" :key="item.product.id" :item="item" />
    </div>
    <div
      v-if="cartStore.items.length > 2"
      :class="['basket-open', { open: open }]"
      @click="toggleOpen()"
    >
      {{ open ? 'Свернуть' : 'Развернуть' }}
      <IconArrowDown />
    </div>
    <div class="basket-promo">
      <BasketPromo v-model:status="statusPromo" @apply="updatePromoDiscount" />
      <div v-if="promoActivated" class="promo-success">
        <div class="promo-success-text">
          <IconSuccess class="promo-success-icon" />
          <p class="promo-success-text">Промокод успешно активирован!</p>
        </div>
        <p class="promo-success-discount">
          Скидка {{ promoPercent }}% на все товары в корзине
        </p>
      </div>
    </div>
    <div class="basket-order">
      <span>Ваш заказ</span>
      <div class="item">
        Товары ({{ cartStore.items.length }})
        <span>{{ priceFormatter(totalPriceOld) }}</span>
      </div>
      <div class="item">
        Скидка на товар
        <span class="red">-{{ priceFormatter(discountPrice) }}</span>
      </div>
      <div v-if="promoDiscount > 0" class="item green">
        Скидка по промо-коду <span>-{{ priceFormatter(promoDiscount) }}</span>
      </div>
    </div>
    <div class="basket-total">
      Итого <span>{{ finalPrice }}</span>
    </div>
    <div class="basket-mikki">
      Начислим миккикоинов
      <span
        >{{ Math.round((totalPriceWithoutDiscount - promoDiscount) * 0.05)
        }}<IconMikki
      /></span>
    </div>
    <div class="basket-action">
      <Button variant="black" size="small" block @click="setOrder">
        {{ isMobileView ? 'Оформить заказ' : 'Далее' }}
      </Button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;
@use '/app/assets/scss/mixins' as m;

.basket {
  &-container {
    @include m.no-scroll;
    padding: 48px 36px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    @media (max-width: $md3 + px) {
      padding: 20px 16px;
      width: 100vw;
    }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      width: 24px;
    }
  }

  &-close {
    cursor: pointer;
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
    max-height: 256px;
    overflow: hidden;
    transition: all 0.3s ease;

    &.open {
      height: auto;
      overflow: visible;
      max-height: none;
    }
  }

  &-open {
    margin-top: 16px;
    font-size: 14px;
    line-height: 155%;
    display: flex;
    justify-content: center;
    gap: 10px;
    color: var(--gray);
    cursor: pointer;

    &.open {
      svg {
        transform: rotate(180deg);
      }
    }

    svg {
      width: 16px;
    }
  }

  &-title {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      font-weight: 400;
    }
  }

  &-order {
    display: flex;
    flex-direction: column;
    line-height: 155%;
    padding: 24px 0;
    border-top: 1px solid var(--gray-400);
    border-bottom: 1px solid var(--gray-400);

    span {
      margin-bottom: 8px;
      font-weight: 700;
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: var(--gray);

      &.green {
        color: var(--green);

        span {
          color: var(--green);
        }
      }

      span {
        margin: 0;
        font-weight: 400;
        color: var(--black);

        &.red {
          color: var(--red);
        }
      }
    }
  }

  &-promo {
    padding: 12px 0;
    border-top: 1px solid var(--gray-400);
    margin-top: 24px;
  }

  .promo-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 6px;
    color: var(--black);
    font-weight: 700;
    font-size: 12px;
    line-height: 155%;
    margin-top: 16px;
    padding: 24px 0 12px;
    border-top: 1px solid var(--gray-400);

    .promo-success-icon {
      width: 24px;
      color: var(--green);
    }

    .promo-success-text {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .promo-success-discount {
      font-weight: 400;
      font-size: 12px;
      line-height: 155%;
    }
  }

  &-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    font-size: 20px;
    line-height: 155%;
    margin-top: 8px;
  }

  &-mikki {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    line-height: 155%;
    margin-top: 8px;

    span {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 700;
      font-size: 14px;
      color: var(--yellow);

      svg {
        width: 18px;
      }
    }
  }

  &-action {
    margin-top: 24px;
  }
}
</style>
