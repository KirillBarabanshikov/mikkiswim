<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import B2BBasketItem from '~/share/components/b2b-basket/B2BBasketItem/B2BBasketItem.vue'
import B2BBasketTotals from '~/share/components/b2b-basket/B2BBasketTotals/B2BBasketTotals.vue'
import { useCartStore } from '~/share/store/cartStore'
import ContactsForm from '~/features/ContactsForm/ContactsForm.vue'

const cartStore = useCartStore()
const showAllItems = ref(false)
const showDeletePopup = ref(false)
const showFormScreen = ref(false)
const itemToDelete = ref<{ productId: number; size: string } | null>(null)

const router = useRouter()

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

const goBack = () => {
  navigateTo('/b2b/catalog')
}

const openDeletePopup = (productId: number, size: string) => {
  itemToDelete.value = { productId, size }
  showDeletePopup.value = true
}

const closeDeletePopup = () => {
  showDeletePopup.value = false
  itemToDelete.value = null
}

const confirmDelete = async () => {
  if (itemToDelete.value) {
    try {
      await cartStore.removeProductFromCart({
        productId: itemToDelete.value.productId,
        size: itemToDelete.value.size
      })
    } catch (error) {
      console.error('Error removing item from cart:', error)
    }
    closeDeletePopup()
  }
}

const showForm = () => {
  showFormScreen.value = true
}

const hideForm = () => {
  showFormScreen.value = false
}

const steps = [
  { step: 'contacts', title: 'Контакты' },
  { step: 'delivery', title: 'Доставка' },
  { step: 'payment', title: 'Оплата' }
]

const currentStep = { step: 'contacts', title: 'Контакты' }
</script>

<template>
  <div class="page">
    <div class="container">
      <div v-if="!showFormScreen" class="basket">
        <div class="basket__title">
          <IconArrowLeft @click="goBack" />
          Корзина ({{ cartLength }})
        </div>
        <div class="basket__list">
          <div
            v-for="item in displayedItems"
            :key="item.uuid"
            class="basket__list-item"
          >
            <B2BBasketItem
              :item="item"
              :api-url="API"
              @delete="openDeletePopup(item.product.id, item.size)"
            />
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

        <B2BBasketTotals
          v-if="displayedItems.length"
          :total-quantity="totalQuantity"
          :total-weight="totalWeight"
          :total-price="totalPrice"
          @continue="showForm"
        />
      </div>

      <div v-if="showFormScreen" class="form-screen">
        <div class="form-header">
          <IconArrowLeft @click="hideForm" />
          <h2>Оформление заказа</h2>
        </div>
        <div class="form-content">
          <ContactsForm :steps="steps" :current-step="currentStep" />
        </div>
      </div>

      <div v-if="showDeletePopup" class="popup-overlay">
        <div class="popup">
          <div class="popup-content">
            <h3>Вы точно хотите удалить товар?</h3>
            <p>Отменить данное действие будет невозможно.</p>
            <div class="popup-buttons">
              <Button color="gray" @click="closeDeletePopup">Отмена</Button>
              <Button color="black" @click="confirmDelete"
                >Удалить товар
              </Button>
            </div>
          </div>
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
        cursor: pointer;
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

  .form-screen {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .form-header {
      display: flex;
      align-items: center;
      gap: 16px;

      h2 {
        font-size: 20px;
        font-weight: 700;
        margin: 0;
      }

      &:deep(svg) {
        cursor: pointer;
        width: 24px;
        height: 24px;
      }
    }

    .form-content {
      padding: 24px;
      background: white;
      border-radius: 8px;
    }
  }

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup {
    min-width: 554px;
    background: white;
    border-radius: 16px;
    padding: 56px 24px;
  }

  .popup-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    text-align: center;

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
    }

    p {
      margin: 0;
      font-size: 13px;
    }
  }

  .popup-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 24px;

    button {
      font-size: 13px;
      min-width: 148px;
      font-weight: 700;
    }
  }
}
</style>
