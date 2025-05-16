<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useCartStore } from '~/share/store/cartStore'

const cartStore = useCartStore()

const {
  public: { API }
} = useRuntimeConfig()

const props = defineProps<{
  product: {
    id: number
    title: string
    price: number
    images: { id: number; image: string }[]
    catalogs: { id: number; title: string; slug: string }[]
    sizes: { id: number; title: string; quantity: number; active: boolean }[]
    weight: number | null
    recommendedPrice: number | null
  }
}>()

const emit = defineEmits<{
  (e: 'update:size', productId: number, size: string): void
  (
    e: 'update:quantity',
    productId: number,
    size: string,
    quantity: number
  ): void
  (e: 'add-to-cart', productId: number, size: string, quantity: number): void
}>()

const selectedSize = ref('')
const counter = ref(1)
const isActionsVisible = ref(false)
const initialCounter = ref(1)

watch(
  () => props.product,
  (newProduct) => {
    if (!newProduct || !newProduct.sizes?.length) return

    if (!selectedSize.value) {
      const activeSize =
        newProduct.sizes.find((size) => size.active) || newProduct.sizes[0]
      selectedSize.value = activeSize.title
      counter.value = 1
      initialCounter.value = 1
    }
  },
  { immediate: true }
)

watch(selectedSize, (newSize) => {
  emit('update:size', props.product.id, newSize)
  counter.value = 1
  initialCounter.value = 1
  emit('update:quantity', props.product.id, newSize, counter.value)
})

const maxQuantity = computed(
  () =>
    props.product?.sizes?.find((s) => s.title === selectedSize.value)
      ?.quantity || 0
)

const increment = () => {
  if (counter.value < maxQuantity.value) {
    counter.value++
    emit('update:quantity', props.product.id, selectedSize.value, counter.value)
  }
}

const decrement = () => {
  if (counter.value > 1) {
    counter.value--
    emit('update:quantity', props.product.id, selectedSize.value, counter.value)
  }
}

const addToCart = async () => {
  if (!selectedSize.value) return

  try {
    await cartStore.addProductToCart({
      productId: props.product.id,
      size: selectedSize.value,
      quantity: counter.value
    })
    initialCounter.value = counter.value
  } catch (error) {
    console.error('Error adding to cart:', error)
  }
}

const toggleActions = () => {
  if (isActionsVisible.value) {
    initialCounter.value = counter.value
  }
  isActionsVisible.value = !isActionsVisible.value
}

const cancelActions = () => {
  counter.value = initialCounter.value
  emit('update:quantity', props.product.id, selectedSize.value, counter.value)
  isActionsVisible.value = false
}

const collapseActions = () => {
  isActionsVisible.value = false
}

const goToCart = () => {
  addToCart()
  navigateTo('/b2b/basket')
}

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)
</script>

<template>
  <client-only>
    <div class="product-card">
      <div class="product-wrapper">
        <img
          :src="
            product.images?.[0]?.image
              ? `${API}${product.images[0].image}`
              : '/B2B-page/placeholder.webp'
          "
          :alt="product.title"
          class="product-image"
        />
        <div class="product-info">
          <div class="row">
            <div class="title-block">
              <div class="catalog-name">
                {{ product.catalogs?.[0]?.title || 'Без каталога' }}
              </div>
              <div class="product-title">{{ product.title }}</div>
            </div>
            <div v-if="!isMobile" class="rrc">
              {{ product.recommendedPrice }} ₽
            </div>
            <div v-if="!isMobile" class="stock">
              {{
                product.sizes.find((s) => s.title === selectedSize)?.quantity ||
                0
              }}
            </div>
            <div v-if="!isMobile" class="weight">
              {{ product.weight ? `${product.weight} гр.` : 'Не указан' }}
            </div>
            <SelectSize v-model="selectedSize" :options="product.sizes" />
          </div>
          <div class="row">
            <div class="price">
              <div class="label">Розница</div>
              {{ product.price }} ₽
            </div>
            <div class="price">
              <div class="label">B2B</div>
              {{ product.price }} ₽
            </div>
            <div v-if="!isMobile" class="counter">
              <Button
                class="gray decrement"
                :disabled="counter === 1"
                @click="decrement"
              >
                <IconMinus />
              </Button>
              <div class="value">{{ counter }}</div>
              <Button
                class="gray increment"
                :disabled="counter >= maxQuantity"
                @click="increment"
              >
                <IconPlus />
              </Button>
            </div>
            <Button class="gray cart" @click="toggleActions">
              <IconBasket />
            </Button>
          </div>
        </div>
      </div>
      <transition name="slide">
        <div v-if="isActionsVisible" class="actions-row">
          <div class="action-container" v-if="isMobile">
            <p>Остаток:</p>
            <div v-if="isMobile" class="weight">
              {{ product.weight ? `${product.weight} гр.` : 'Не указан' }}
            </div>
          </div>
          <div class="action-container" v-if="isMobile">
            <p>Вес, гр.</p>
            <div v-if="isMobile" class="stock">
              {{
                product.sizes.find((s) => s.title === selectedSize)?.quantity ||
                0
              }}
            </div>
          </div>
          <div class="action-container" v-if="isMobile">
            <p>РРЦ, ₽</p>
            <div v-if="isMobile" class="rrc">
              {{ product.recommendedPrice }} ₽
            </div>
          </div>

          <div class="action-counter" v-if="isMobile">
            <p>Количество</p>
            <div v-if="isMobile" class="mobile-counter">
              <Button
                class="gray decrement"
                :disabled="counter === 1"
                @click="decrement"
              >
                <IconMinus />
              </Button>
              <div class="value">{{ counter }}</div>
              <Button
                class="gray increment"
                :disabled="counter >= maxQuantity"
                @click="increment"
              >
                <IconPlus />
              </Button>
            </div>
          </div>
          <Button
            v-if="!isMobile"
            class="white-gray cancel"
            @click="cancelActions"
          >
            Отмена
          </Button>
          <Button class="white-gray collapse" @click="collapseActions">
            Свернуть
          </Button>
          <Button class="green add-to-cart" @click="goToCart">
            <div class="btn-text">
              {{ counter }} шт. Размер {{ selectedSize }}
              <span>Перейти в корзину</span>
            </div>
            <IconArrowRight />
          </Button>
        </div>
      </transition>
    </div>
  </client-only>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.product-wrapper {
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 32px;
}

.product-card {
  padding-block: 0 32px;
  border-bottom: 1px solid var(--gray-100);

  &:last-child {
    border-bottom: 1px solid transparent;
  }
}

.product-image {
  flex: 0 0 115px;
  width: 115px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .title-block {
    flex: 0 0 261px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .product-title {
      font-weight: 700;
      font-size: 16px;
    }
  }

  .rrc {
    flex: 0 0 87px;
  }

  .stock {
    width: 87px;
  }

  .weight {
    flex: 0 0 87px;
    text-align: right;
  }
}

.actions-row {
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 32px;
  overflow: hidden;
  width: 100%;
  align-self: stretch;

  button {
    width: 100%;
    max-height: 48px;
  }

  svg {
    width: 24px;
    margin-left: 8px;
  }

  .btn-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3px;

    span {
      font-weight: 400;
      font-size: 12px;
    }
  }

  .add-to-cart {
    border: 1px solid transparent;
  }

  .cancel,
  .collapse {
    background: transparent;
  }
}

.row {
  display: flex;
  align-items: center;
  gap: 32px;

  .counter {
    display: flex;
    flex-direction: row;
    align-items: center;

    .value {
      min-width: 85px;
      padding: 12px 33px;
      font-size: 16px;
    }

    .decrement,
    .increment {
      min-width: 87px;

      svg {
        width: 20px;
      }
    }
  }

  .price {
    flex: 0 0 115px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-weight: 700;
    font-size: 16px;

    .label {
      font-weight: 400;
      color: var(--gray);
    }
  }

  .cart {
    min-width: 115px;

    svg {
      width: 21px;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 150px;
}

@media (max-width: $md2 + 'px') {
  .label {
    font-size: 12px;
  }

  .product-image {
    flex: 0 0 96px;
    width: 96px;
    height: 126px;
    object-fit: cover;
  }

  .catalog-name {
    font-size: 12px;
  }

  .title-block {
    flex: 0 0 224px !important;
  }

  .rrc {
    flex: 0 0 66.5px !important;
  }

  .stock {
    width: 27px !important;
  }

  .custom-select {
    min-width: 96px !important;
  }

  .decrement,
  .increment {
    min-width: 80px !important;
  }

  .price {
    flex: 0 0 96px !important;
  }

  .value {
    padding: 12px 21px !important;
    min-width: 64px !important;
  }

  .cart {
    min-width: 96px !important;
  }

  .actions-row {
    gap: 24px;
  }
}

@media (max-width: $md3 + 'px') {
  .product-title {
    font-size: 13px !important;
  }

  .title-block {
    flex: 0 !important;
  }

  .row {
    justify-content: space-between;
    gap: 8px;
  }

  .price {
    text-wrap: nowrap;
    flex: 0 !important;
    font-size: 13px !important;
  }

  .product-card {
    padding: 0;
    border: none;
  }

  .product-image {
    width: 76px;
    height: 100px;
    flex: 0 !important;
  }

  .label {
    font-size: 10px !important;
  }

  .product-info {
    gap: 16px;
    flex: 1 !important;
  }

  .actions-row {
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }

  .rrc,
  .stock,
  .weight {
    font-size: 13px;
    color: var(--gray);
    flex: 0 !important;
    text-wrap: nowrap;
  }

  .action-container {
    display: flex;
    justify-content: space-between;

    p {
      font-size: 13px;
      color: var(--gray);
    }
  }

  .action-counter {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 13px;
      color: #303030;
    }

    button {
      min-width: 64px !important;
      max-width: 64px !important;
      min-height: 32px !important;
      max-height: 32px !important;
      border-radius: 22px;
      padding: 10px;
      width: 64px;
      height: 32px;

      svg {
        width: 14px !important;
        height: 2px !important;
      }
    }

    .value {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #f4f4f4;
      border-radius: 16px;
      width: 56px;
      height: 32px;
      font-weight: 400;
      font-size: 14px;
      line-height: 155%;
      text-align: center;
      color: #303030;
    }
  }

  .mobile-counter {
    display: flex;
    gap: 9px;
  }
}
</style>
