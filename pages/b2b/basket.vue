<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '~/share/store/cartStore'
import { priceFormatter } from '~/share/utils/priceFormatter'

const cartStore = useCartStore()
const showAllItems = ref(false)

definePageMeta({
  middleware: ['auth'],
  requiresAuth: true
})

const {
  public: { API }
} = useRuntimeConfig()

const cartLength = computed(() => cartStore.items?.length || 0)

const displayedItems = computed(() =>
  showAllItems.value ? cartStore.items : cartStore.items.slice(0, 3)
)

const totalPrice = computed(() =>
  cartStore.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
)

const totalWeight = computed(() =>
  cartStore.items.reduce(
    (sum, item) => sum + (item.product.weight || 0) * item.quantity,
    0
  )
)

const totalQuantity = computed(() =>
  cartStore.items.reduce((sum, item) => sum + item.quantity, 0)
)

onMounted(async () => {
  await cartStore.fetchCart()
})

const toggleShowAll = () => {
  showAllItems.value = !showAllItems.value
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="basket">
        <div class="basket__title">
          <IconArrowLeft />
          Корзина ({{ cartLength }})
        </div>
        <div class="basket__list">
          <div
            v-for="item in displayedItems"
            :key="item.uuid"
            class="basket__list-item"
          >
            <div class="basket-item">
              <div class="basket-item__pic">
                <img
                  :src="API + item.product.images[0].image"
                  alt=""
                  width="115"
                  height="150"
                />
                <div class="basket-item__pic-quantity">
                  {{ item.quantity }}
                </div>
              </div>
              <div class="basket-item__body">
                <div class="basket-item__row">
                  <div class="basket-item__title">
                    {{ item.product.catalogs[0].title }}
                    <b>{{ item.product.title }}</b>
                  </div>
                  <div class="basket-item__actions">
                    <IconEdit />
                    <IconDelete />
                  </div>
                </div>
                <div class="basket-item__row">
                  <div class="basket-item__details">
                    <div class="basket-item__details-item">
                      <div class="basket-item__details-item__label">
                        Розница
                      </div>
                      <div class="basket-item__details-item__value">
                        {{ priceFormatter(item.product.price) }}
                      </div>
                    </div>
                    <div class="basket-item__details-item">
                      <div class="basket-item__details-item__label">B2B</div>
                      <div class="basket-item__details-item__value">
                        {{ priceFormatter(item.product.priceB2B) }}
                      </div>
                    </div>
                    <div class="basket-item__details-item">
                      <div class="basket-item__details-item__label">Размер</div>
                      <div class="basket-item__details-item__value">
                        {{ item.size }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          v-if="cartLength > 3"
          class="show-all-button"
          @click="toggleShowAll"
        >
          <span>{{ showAllItems ? 'Свернуть' : 'Развернуть' }}</span>
          <IconArrowDown
            class="arrow-icon"
            :class="{ rotated: showAllItems }"
          />
        </button>

        <div class="basket-totals">
          <div class="basket-totals-row">
            <div class="basket-totals__item">
              <div class="basket-totals__item-label">Количество, шт.</div>
              <div class="basket-total__item-value">
                {{ totalQuantity }}
              </div>
            </div>
            <div class="basket-totals__item">
              <div class="basket-totals__item-label">Вес, гр</div>
              <div class="basket-totals__item-value">{{ totalWeight }}</div>
            </div>
          </div>
          <div class="basket-totals-row">
            <div class="basket-totals-row__label">Итого</div>
            <div class="basket-totals-row__value">
              {{ priceFormatter(totalPrice) }}
            </div>
          </div>
          <Button>Продолжить</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  .container {
    max-width: 848px;
    width: 100%;
    margin-bottom: 48px;
  }

  .basket {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    &__title {
      display: flex;
      align-items: center;
      gap: 16px;
      font-weight: 700;
      font-size: 20px;

      &:deep(svg) {
        width: 24px;
        height: 24px;
      }
    }

    &__list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;

      &-item {
        width: 100%;
      }
    }

    &-totals {
      display: flex;
      flex-direction: column;
      gap: 16px;
      line-height: 155%;

      &-row {
        display: flex;
        justify-content: space-between;

        &:last-child {
          border-top: 1px solid var(--gray-400);
          padding-top: 21px;
          font-weight: 700;
          font-size: 20px;
        }
      }

      &__item {
        display: flex;
        flex-direction: column;
        gap: 6px;

        &:nth-child(2) {
          .basket-totals__item-value {
            text-align: right;
          }
        }

        &-label {
          font-weight: 700;
          font-size: 16px;
        }

        &-value {
          font-size: 16px;
        }
      }

      button {
        margin: 0 auto;
        min-width: 261px;
      }
    }
  }

  .basket-item {
    width: 100%;
    display: flex;
    gap: 22px;

    &__pic {
      position: relative;
      flex-shrink: 0;

      img {
        border-radius: 8px;
        object-fit: contain;
        display: block;
      }

      &-quantity {
        position: absolute;
        bottom: 8px;
        left: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--white);
        border-radius: 8px;
        padding: 0 8px;
        width: 34px;
        height: 22px;
        font-weight: 700;
        font-size: 14px;
        line-height: 155%;
      }
    }

    &__body {
      padding: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    &__title {
      line-height: 155%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 14px;

      b {
        font-weight: 700;
        font-size: 16px;
      }
    }

    &__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__actions {
      display: flex;
      gap: 32px;

      &:deep(svg) {
        cursor: pointer;
        color: var(--gray);
        width: 23px;
        height: 23px;
      }
    }

    &__details {
      line-height: 155%;
      display: flex;
      gap: 32px;

      &-item {
        flex: 0 0 114px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        &__value {
          font-weight: 700;
          font-size: 16px;
        }

        &__label {
          color: var(--gray);
          font-size: 14px;
        }
      }
    }
  }

  .show-all-button {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 400;
    font-size: 16px;
    margin: 24px auto;
    padding: 12px 24px;
    background: none;
    cursor: pointer;
    color: var(--gray);
    transition: all 0.2s ease;
    border: none;

    &:hover {
      color: var(--primary);
    }

    .arrow-icon {
      transition: transform 0.3s ease;
      width: 16px;
      height: 16px;

      &.rotated {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
