<script setup lang="ts">
import type { Refund } from '~/entities/refund/model/Refund'
import IconBox from '~/share/UI/Icons/IconBox.vue'
import IconCard from '~/share/UI/Icons/IconCard.vue'
import IconCoins from '~/share/UI/Icons/IconCoins.vue'
import IconMark from '~/share/UI/Icons/IconMark.vue'
import IconMessage from '~/share/UI/Icons/IconMessage.vue'
import IconUser from '~/share/UI/Icons/IconUser.vue'
import { priceFormatter } from '~/share/utils/priceFormatter'

defineProps<{
  refund: Refund
  api: string
}>()

defineEmits(['toggle'])
</script>

<template>
  <div class="card-details">
    <div class="details-content">
      <div class="item">
        <div class="column">
          <div class="block">
            <div class="subtitle">
              <IconMark />
              Адрес возврата
            </div>
            <div class="content">
              <div>{{ refund.addressRefund }}</div>
            </div>
          </div>
          <div class="block">
            <div class="subtitle">
              <IconStatus />
              Статус
            </div>
            <div class="content">{{ refund.statusText }}</div>
          </div>
        </div>
        <div class="column">
          <div class="block">
            <div class="subtitle">
              <IconQuestion />
              Причина
            </div>
            <div class="content">{{ refund.reason }}</div>
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
              v-for="refundProduct in refund.products"
              :key="refundProduct.product.id"
              class="product-card"
            >
              <img
                :src="`${api}${refundProduct.product.images[0].image}`"
                alt="Product image"
              />
              <div class="card-wrapper">
                <div class="subtitle category">
                  {{
                    refundProduct.product.catalogs[0]?.title ??
                    'Неизвестная категория'
                  }}
                </div>
                <div class="subtitle product">
                  {{ refundProduct.product.title }}
                </div>
                <div class="size">
                  Размер <span>{{ refundProduct.product.sizes[0].title }}</span>
                </div>
                <div class="price">
                  {{ priceFormatter(refundProduct.product.price) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.card-details {
  transition: transform 0.3s ease;

  .details-content {
    display: flex;
    flex-direction: column;
    gap: 32px;

    .item {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 32px;

      .subtitle {
        display: flex;
        gap: 13px;
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

    .column {
      display: flex;
      flex-direction: column;
      gap: 32px;
      flex: 0 0 236px;

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
  }
}

@media (max-width: $md2 + 'px') {
  .page {
    .content {
      //justify-content: normal;
    }

    .loyalty-content {
      display: none;
    }
  }
}

@media (max-width: $md3 + 'px') {
  .list {
    grid-template-columns: repeat(3, 90px) !important;
  }

  .content-wrapper {
    .details-content {
      gap: 24px !important;

      .item {
        row-gap: 24px;
        grid-template-columns: repeat(1, 1fr) !important;

        .column {
          gap: 24px;
        }
      }
    }
  }
}
</style>
