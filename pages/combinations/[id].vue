<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useProductCombination } from '~/entities/product-combination/api/query'
import SizeHelpButton from '~/share/components/combinations/SizeHelpButton.vue'
import { useFormatPrice } from '~/share/utils/useFormatPrice'
import { addCombinationToCart } from '~/share/api/cart'

definePageMeta({
  middleware: ['auth'],
  ssr: false
})

const {
  public: { API }
} = useRuntimeConfig()

const route = useRoute()
const combinationId = route.params.id as string

const { data: combination, isPending } = useProductCombination(combinationId)

const selectedSizes = ref<Record<number, string>>({})

const updateSize = (productId: number, size: string) => {
  selectedSizes.value[productId] = size
}

const addToCart = async () => {
  try {
    const productsWithSizes = combination.value?.combinationsProducts.filter(
      (cp) => cp.product.sizes?.length
    )

    if (productsWithSizes?.length) {
      const allSizesSelected = productsWithSizes.every(
        (cp) => selectedSizes.value[cp.product.id]
      )

      if (!allSizesSelected) {
        alert('Пожалуйста, выберите размеры для всех товаров')
        return
      }
    }

    await addCombinationToCart({
      combinationId: parseInt(combinationId),
      sizes: selectedSizes.value
    })

    alert('Комбинация добавлена в корзину')
  } catch (error) {
    console.error('Ошибка при добавлении в корзину:', error)
    alert('Произошла ошибка при добавлении в корзину')
  }
}
</script>

<template>
  <div>
    <Header variant="black"></Header>
    <div class="container">
      <div class="combination">
        <div v-if="combination" class="combination-details">
          <div class="combination-products">
            <div
              v-for="cp in combination.combinationsProducts"
              :key="cp.id"
              class="product-item"
            >
              <img
                :src="API + cp.product.images[0]?.image"
                :alt="cp.product.title"
              />
              <div class="product-inner">
                <div class="product-content">
                  <div class="product-title-content">
                    <div class="product-catalog">
                      {{ cp.product.catalogs[0]?.title }}
                    </div>
                    <div class="product-title">{{ cp.product.title }}</div>
                  </div>
                  <div class="product-prices">
                    <div class="product-old-price">
                      {{ useFormatPrice(cp.product.oldPrice) }} ₽
                    </div>
                    <div class="product-new-price">
                      {{ useFormatPrice(cp.product.price) }} ₽
                    </div>
                  </div>
                </div>
                <div class="product-actions">
                  <SelectSize
                    v-if="cp.product.sizes?.length"
                    v-model="selectedSizes[cp.product.id]"
                    :options="cp.product.sizes"
                    class="size-select"
                    @update:model-value="
                      (size) => updateSize(cp.product.id, size)
                    "
                  />
                  <SizeHelpButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isPending && combination" class="combination-info">
          <div class="combination-title">
            {{ combination?.title }}
          </div>
          <div class="combination-price-block">
            <div class="combination-prices">
              <div class="combination-old-price">
                {{ useFormatPrice(combination.defaultCost) }} ₽
              </div>
              <div class="combination-new-price">
                {{ useFormatPrice(combination.discountCost) }} ₽

                <div class="combination-viewers">
                  <IconEye />
                  1652
                </div>
              </div>
            </div>
          </div>
          <div class="combination-actions">
            <Button class="combination-action" @click="addToCart"
              >В корзину
            </Button>
            <IconFavorite />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.combination {
  margin-top: 112px;
  display: flex;
  gap: 178px;

  &-details {
  }

  &-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &-title {
    font-weight: 700;
    font-size: 24px;
  }

  &-price-block {
    display: flex;
    flex-direction: column;
  }

  &-prices {
    display: flex;
    flex-direction: column;
  }

  &-old-price {
    font-weight: 400;
    font-size: 14px;
    text-decoration: line-through;
    color: var(--gray);
  }

  &-new-price {
    display: flex;
    gap: 12px;
    align-items: center;
    font-weight: 400;
    font-size: 20px;
    line-height: 155%;
  }

  &-viewers {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--gray);

    svg {
      color: var(--gray-400);
      width: 24px;
      height: 24px;
    }
  }

  &-actions {
    display: flex;
    align-items: center;
    gap: 16px;

    svg {
      cursor: pointer;
      width: 28px;
      height: 28px;
      transition: color 0.3s ease;

      &:hover {
        color: var(--red);
      }
    }
  }

  &-action {
    min-width: 261px;
  }

  &-products {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.product {
  &-item {
    min-width: 848px;
    background-color: var(--gray-300);
    border-radius: 16px;
    padding: 8px;
    width: 250px;
    display: flex;
    gap: 32px;

    img {
      width: 115px;
      height: 115px;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  &-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
    margin-right: 10px;

    .size-select {
      :deep(.select-content) {
        z-index: 0;

        .select-button {
          border-radius: 24px;
          background-color: #ffffff !important;
        }

        .options-list {
          border-radius: 24px;
          background-color: #ffffff !important;
        }
      }
    }
  }

  &-title-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &-title {
    font-weight: 700;
    font-size: 16px;
  }

  &-catalog {
    font-size: 14px;
  }

  &-prices {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &-old-price {
    font-weight: 700;
    font-size: 16px;
  }

  &-new-price {
    font-weight: 400;
    font-size: 14px;
    text-decoration: line-through;
    color: var(--gray);
  }
}
</style>
