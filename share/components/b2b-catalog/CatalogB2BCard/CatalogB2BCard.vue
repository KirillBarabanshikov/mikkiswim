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
            <div class="rrc">3 900 ₽</div>
            <div class="stock">
              {{
                product.sizes.find((s) => s.title === selectedSize)?.quantity ||
                0
              }}
            </div>
            <div class="weight">
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
            <div class="counter">
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
          <Button class="white-gray cancel" @click="cancelActions">
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

<style scoped>
.product-wrapper {
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 32px;
}

.product-card {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 32px;
  padding-block: 0 32px;
  border-bottom: 1px solid var(--gray-100);
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
</style>
