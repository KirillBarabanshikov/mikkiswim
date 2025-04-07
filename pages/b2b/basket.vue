<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import type { Address } from '~/entities/address/model/Address'
import B2BDeliveryForm from '~/features/B2BDeliveryForm/B2BDeliveryForm.vue'
import ContactsForm from '~/features/ContactsForm/ContactsForm.vue'
import B2BBasketItem from '~/share/components/b2b-basket/B2BBasketItem/B2BBasketItem.vue'
import B2BBasketTotals from '~/share/components/b2b-basket/B2BBasketTotals/B2BBasketTotals.vue'
import EmptyCart from '~/share/components/basket/EmptyCart/EmptyCart.vue'
import { useCartStore } from '~/share/store/cartStore'
import IconArrowDown from '~/share/UI/Icons/IconArrowDown.vue'
import IconArrowLeft from '~/share/UI/Icons/IconArrowLeft.vue'
import { DeviceSize, useSizeWindow } from '~/share/utils/useSizeWindow'

const steps = ref([
  { step: 'contacts', title: '1. Контакты' },
  { step: 'delivery', title: '2. Доставка' }
])

type Step = {
  step: string
  title: string
}

const { deviceSize } = useSizeWindow()
const currentStep = ref(steps.value[0])
const selectedAddress = ref<Address | null>(null)
const showForms = ref(false)
const showAllItems = ref(false)
const showDeletePopup = ref(false)
const itemToDelete = ref<{ productId: number; size: string } | null>(null)

const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)
const router = useRouter()

const {
  public: { API }
} = useRuntimeConfig()

const cartLength = computed(() => items.value?.length || 0)
const displayedItems = computed(() =>
  showAllItems.value ? items.value : items.value.slice(0, 3)
)
const totalPrice = computed(() =>
  items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
)
const totalWeight = computed(() =>
  items.value.reduce(
    (sum, item) => sum + (item.product.weight || 0) * item.quantity,
    0
  )
)
const totalQuantity = computed(() =>
  items.value.reduce((sum, item) => sum + item.quantity, 0)
)
const isCartEmpty = computed(() => items.value.length === 0)
const isMobile = computed(() => deviceSize.value <= DeviceSize.MOBILE)

definePageMeta({
  middleware: ['auth'],
  requiresAuth: true
})

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

const setStep = (step: Step) => {
  currentStep.value = step
}

const onNextStep = () => {
  const index = steps.value.indexOf(currentStep.value)
  if (index < steps.value.length - 1) {
    currentStep.value = steps.value[index + 1]
  }
}

const onPrevStep = () => {
  const index = steps.value.indexOf(currentStep.value)
  if (index > 0) {
    currentStep.value = steps.value[index - 1]
  } else {
    showForms.value = false
  }
}

const onCheckout = () => {
  showForms.value = true
}
</script>

<template>
  <div class="page">
    <div class="container">
      <template v-if="!isCartEmpty">
        <div v-if="!showForms" class="basket">
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
            @continue="onCheckout"
          />
        </div>

        <div v-if="showForms" class="form-screen">
          <div class="stepper" v-if="!isMobile">
            <h3 class="form-title">Оформление заказа</h3>
            <div class="steps">
              <div
                v-for="step in steps"
                :key="step.step"
                class="steps-item"
                :class="{ active: currentStep.step === step.step }"
              >
                <span @click="setStep(step)" class="steps-title">
                  {{ step.title }}
                </span>
              </div>
            </div>
            <ContactsForm
              v-if="currentStep.step === 'contacts'"
              v-model:selected-address="selectedAddress"
              @next="onNextStep"
              :steps="steps"
              :current-step="currentStep"
            />
            <B2BDeliveryForm
              v-if="currentStep.step === 'delivery'"
              :items="items"
              :selected-address="selectedAddress"
              @next="onNextStep"
              :steps="steps"
              :current-step="currentStep"
            />
            <div class="button-container">
              <Button
                v-if="currentStep.step !== 'delivery'"
                variant="black"
                size="small"
                block
                @click="onNextStep"
              >
                Продолжить
              </Button>
              <Button
                class="button-prev"
                size="small"
                outline
                @click="onPrevStep"
              >
                Назад
              </Button>
            </div>
          </div>

          <template v-if="isMobile">
            <ContactsForm
              v-if="currentStep.step === 'contacts'"
              v-model:selected-address="selectedAddress"
              @next="onNextStep"
              :steps="steps"
              :current-step="currentStep"
            />
            <B2BDeliveryForm
              v-if="currentStep.step === 'delivery'"
              :items="items"
              :selected-address="selectedAddress"
              @next="onNextStep"
              :steps="steps"
              :current-step="currentStep"
            />
            <div class="button-container">
              <Button
                v-if="currentStep.step !== 'delivery'"
                variant="black"
                size="small"
                block
                @click="onNextStep"
              >
                Продолжить
              </Button>
              <Button
                class="button-prev"
                size="small"
                outline
                @click="onPrevStep"
              >
                Назад
              </Button>
            </div>
          </template>
        </div>

        <Transition name="fade">
          <div v-if="showDeletePopup" class="popup-overlay">
            <div class="popup">
              <div class="popup-content">
                <h3>Вы точно хотите удалить товар?</h3>
                <p>Отменить данное действие будет невозможно.</p>
                <div class="popup-buttons">
                  <Button color="gray" @click="closeDeletePopup">Отмена</Button>
                  <Button color="black" @click="confirmDelete">
                    Удалить товар
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </template>
      <template v-else>
        <EmptyCart />
      </template>
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
    max-width: 554px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 0 auto;
  }

  .form-title {
    margin-bottom: 32px;
  }

  .stepper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .steps {
    display: flex;
    align-items: center;
    align-self: flex-start;
    margin-bottom: 24px;

    &-item {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 16px;
      line-height: 155%;
      color: var(--gray-400);
      margin-right: 8px;

      &.active {
        color: black;
      }
    }

    .steps-title {
      white-space: nowrap;
      cursor: pointer;
    }
  }

  .button-container {
    display: flex;
    flex-direction: column;
    margin-top: 48px;
    gap: 16px;

    button {
      width: 261px;
    }
  }

  .button-prev {
    color: var(--gray);
    border: 1px solid var(--gray);
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
    background: white;
    border-radius: 16px;
    padding: 56px 117px;
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

  @media (max-width: 768px) {
    .container {
      width: 100vw;
    }
  }
}
</style>
