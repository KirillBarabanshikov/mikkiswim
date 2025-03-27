<script setup lang="ts">
import type { Order } from '~/entities/order/model/Order'
import IconBox from '~/share/UI/Icons/IconBox.vue'
import IconCard from '~/share/UI/Icons/IconCard.vue'
import IconCoins from '~/share/UI/Icons/IconCoins.vue'
import IconMark from '~/share/UI/Icons/IconMark.vue'
import IconMessage from '~/share/UI/Icons/IconMessage.vue'
import IconUser from '~/share/UI/Icons/IconUser.vue'
import { priceFormatter } from '~/share/utils/priceFormatter'

defineProps<{
  order: Order
  api: string
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'to-refund'): void
  (e: 'open-review'): void
}>()
</script>

<template>
  <div class="card-details">
    <div class="details-content">
      <div class="item">
        <div class="column-left">
          <div class="block">
            <div class="subtitle">
              <IconMark />
              Доставка
            </div>
            <div class="content">
              <div>
                {{ order.deliveryType }}
              </div>
              <div>
                {{ order.address }}
              </div>
              <div>Дата доставки: 4 февраля 2025</div>
            </div>
          </div>
          <div class="block">
            <div class="subtitle">
              <IconUser />
              Получатель
            </div>
            <div class="content">
              <div>{{ order.name }} {{ order.surname }}</div>
              <div>{{ order.email }}</div>
              <div>{{ order.phone }}</div>
            </div>
          </div>
        </div>
        <div class="column-right">
          <div class="block">
            <div class="header">
              <div class="subtitle">
                <IconCard />
                Оплачено
              </div>
              <span>{{ priceFormatter(order.total) }}</span>
            </div>
            <div class="payment-method">Картой онлайн MIR **3696</div>
            <div class="content">
              <div class="item">
                <p>Товары</p>
                {{ priceFormatter(order.productsCost) }}
              </div>
              <div class="item">
                <p>Доставка</p>
                {{ priceFormatter(order.deliveryCost) }}
              </div>
              <div class="item">
                <p>Баллами Mikkicoins</p>
                -{{ priceFormatter(order.mikkiCoinsUsed) }}
              </div>
              <div class="item">
                <p>Итого</p>
                <span>{{ priceFormatter(order.total) }}</span>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="subtitle">
              <IconCoins />
              Mikkicoins
            </div>
            <div class="content yellow">
              <div class="item">
                <p>Начислено за покупку</p>
                <div class="mikki">
                  <span>+ {{ order.mikkiCoinsGain }}</span>
                  <IconMikki />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="block">
          <div class="subtitle">
            <IconBox />
            Товары
          </div>
          <div class="list">
            <div
              v-for="orderProduct in order.products"
              :key="orderProduct.product.id"
              class="product-card"
            >
              <img
                :src="`${api}${orderProduct.product.images[0].image}`"
                alt="Product image"
              />
              <div class="card-wrapper">
                <div class="subtitle category">
                  {{
                    orderProduct.product.catalogs[0]?.title ??
                    'Неизвестная категория'
                  }}
                </div>
                <div class="subtitle product">
                  {{ orderProduct.product.title }}
                </div>
                <div class="size">
                  Размер <span>{{ orderProduct.product.sizes[0].title }}</span>
                </div>
                <div class="price">
                  {{ priceFormatter(orderProduct.product.price) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="details-actions">
      <div class="item-left">
        <div class="review" @click="$emit('open-review')">
          <IconMessage />
          Оставить отзыв
        </div>
      </div>
      <div class="item-right">
        <div class="refund" @click="$emit('to-refund')">Оформить возврат</div>
        <div class="more" @click="$emit('toggle')">Свернуть</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.card-details {
  padding-top: 24px;
  transition: transform 0.3s ease;

  .details-content {
    .item {
      display: flex;
      gap: 32px;

      .subtitle {
        display: flex;
        gap: 8px;
        font-size: 16px;

        svg {
          color: var(--gray);
          width: 24px;
          height: 24px;
        }
      }

      .list {
        margin-top: 24px;
        display: grid;
        grid-template-columns: repeat(3, 261px);
        row-gap: 24px;
        column-gap: 8px;

        .product-card {
          display: flex;
          gap: 16px;

          img {
            flex: 0 0 80px;
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 5px;
          }

          .card-wrapper {
            display: flex;
            flex-direction: column;
            gap: 6px;

            .subtitle {
              font-size: 12px;
              font-weight: 400;
            }

            .subtitle.product {
              font-weight: 700;
            }

            .size {
              font-weight: 400;
              font-size: 10px;

              span {
                font-weight: 700;
              }
            }

            .price {
              margin-top: 4px;
              font-size: 14px;
            }
          }
        }
      }
    }

    display: flex;
    flex-direction: column;
    gap: 32px;

    .column-left {
      display: flex;
      flex-direction: column;
      gap: 32px;
      flex: 0 0 261px;

      .content {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 12px;
        line-height: 155%;
        color: var(--gray);
      }
    }

    .column-right {
      display: flex;
      flex-direction: column;
      gap: 32px;
      flex: 1;

      .block {
        .header {
          display: flex;
          justify-content: space-between;

          span {
            font-weight: 700;
            font-size: 14px;
          }
        }

        .payment-method {
          font-size: 12px;
          color: var(--gray);
          margin: 5px 0 24px 0;
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          color: var(--gray);
          line-height: 155%;

          .item {
            display: flex;
            justify-content: space-between;

            span {
              color: var(--black);
              font-size: 14px;
              font-weight: 700;
            }
          }
        }

        .content.yellow {
          margin-top: 5px;

          .mikki {
            display: flex;
            gap: 6px;

            svg {
              width: 24px;
              height: 17px;
              color: var(--yellow);
            }

            span {
              font-weight: 700;
              font-size: 16px;
              color: var(--yellow);
            }
          }
        }
      }
    }
  }

  .details-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;
    min-height: 52px;
    opacity: 1;
    transition: opacity 0.2s ease;
    font-weight: 700;
    font-size: 13px;
    line-height: 155%;
    letter-spacing: 0.02em;
    color: var(--gray);
    cursor: pointer;

    .item-right {
      display: flex;
      gap: 32px;

      :hover {
        border-radius: 30px;
        background: var(--gray-400);
        color: var(--black);
      }

      .refund {
        padding: 0 10px;
        height: 25px;
        transition: all 0.3s ease;
      }

      .more {
        padding: 0 10px;
        height: 25px;
        transition: all 0.3s ease;
      }
    }

    .item-left {
      transition: all 0.3s ease;

      .review {
        padding: 0 10px;
        height: 25px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      :hover {
        border-radius: 30px;
        background: var(--gray-400);
        color: var(--black);
      }

      svg {
        width: 22px;
        height: 20px;
      }
    }
  }
}

@media (max-width: $md3 + 'px') {
  .item-right {
    color: var(--black);
    font-size: 13px;
    font-weight: 400;
    width: 100%;
    gap: 0;
    justify-content: space-between;
  }

  .details-content {
    .item {
      flex-direction: column;
    }
  }

  .column-right {
    .block {
      .content {
        .item {
          flex-direction: row;
          gap: 8px;
        }
      }
    }
  }

  .item-left {
    display: none;
  }
}
</style>
