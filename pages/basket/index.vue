<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

import type { Address } from '~/entities/address/model/Address'
import ContactsForm from '~/features/ContactsForm/ContactsForm.vue'
import DeliveryForm from '~/features/DeliveryForm/DeliveryForm.vue'
import PaymentForm from '~/features/PaymentForm/PaymentForm.vue'
import EmptyCart from '~/share/components/basket/EmptyCart/EmptyCart.vue'
import OrderDetails from '~/share/components/basket/OrderDetails/OrderDetails.vue'
import { useCartStore } from '~/share/store/cartStore'
import IconArrowRight from '~/share/UI/Icons/IconArrowRight.vue'
import { DeviceSize, useSizeWindow } from '~/share/utils/useSizeWindow'

const steps = ref([
  { step: 'contacts', title: '1. Контакты' },
  { step: 'delivery', title: '2. Доставка' },
  { step: 'payment', title: '3. Оплата' }
])

type Step = {
  step: string
  title: string
}

const { deviceSize } = useSizeWindow()
const currentStep = ref(steps.value[0])
const selectedAddress = ref<Address | null>(null)
const showForms = ref(false)

const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)

const isCartEmpty = computed(() => items.value.length === 0)
const isMobile = computed(() => deviceSize.value <= DeviceSize.MOBILE)

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

onMounted(() => {
  cartStore.fetchCart()
})

definePageMeta({
  middleware: ['auth'],
  requiresAuth: true
})
</script>

<template>
  <section class="cart">
    <div class="cart-container">
      <template v-if="!isCartEmpty">
        <div class="stepper" v-if="!isMobile">
          <div class="steps">
            <div
              v-for="(step, index) in steps"
              :key="step.step"
              class="steps-item"
              :class="{ active: currentStep.step === step.step }"
            >
              <span @click="setStep(step)" class="steps-title">
                {{ step.title }}
              </span>
              <IconArrowRight
                v-if="index < steps.length - 1"
                class="step-arrow"
              />
            </div>
          </div>
          <ContactsForm
            v-if="currentStep.step === 'contacts'"
            v-model:selected-address="selectedAddress"
            @next="onNextStep"
            :steps="steps"
            :current-step="currentStep"
          />
          <DeliveryForm
            v-if="currentStep.step === 'delivery'"
            :items="items"
            :selected-address="selectedAddress"
            @next="onNextStep"
            :steps="steps"
            :current-step="currentStep"
          />
          <PaymentForm
            v-if="currentStep.step === 'payment'"
            :steps="steps"
            :current-step="currentStep"
          />
        </div>
        <template v-if="isMobile && showForms">
          <ContactsForm
            v-if="currentStep.step === 'contacts'"
            v-model:selected-address="selectedAddress"
            @next="onNextStep"
            :steps="steps"
            :current-step="currentStep"
          />
          <DeliveryForm
            v-if="currentStep.step === 'delivery'"
            :items="items"
            :selected-address="selectedAddress"
            @next="onNextStep"
            :steps="steps"
            :current-step="currentStep"
          />
          <PaymentForm
            v-if="currentStep.step === 'payment'"
            :steps="steps"
            :current-step="currentStep"
          />
          <div class="button-container">
            <Button
              v-if="currentStep.step !== 'payment'"
              variant="black"
              size="small"
              block
              @click="onNextStep"
            >
              Далее
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
        <OrderDetails v-if="!showForms" :items="items" @checkout="onCheckout" />
      </template>
      <template v-else>
        <EmptyCart />
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.cart {
  display: flex;
  margin: 0 auto;
}

.cart-container {
  display: flex;
  margin: 0 auto;
}

.stepper {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.steps {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  &-item {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 155%;
    color: var(--gray-400);
    margin-right: 8px;
  }

  span {
    white-space: nowrap;
    cursor: pointer;
  }

  &-item.active {
    color: black;
  }
}

.step-arrow {
  margin-left: 4px;
  color: var(--gray-400);
  width: 16px;
}

.button-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  gap: 16px;
  padding: 16px;
}

.button-prev {
  color: var(--gray);
  border: 1px solid var(--gray);
}

@media (max-width: #{$md2 + px}) {
  .cart-container {
    width: 100vw;
  }
}

@media (max-width: #{$md3 + px}) {
  .cart-container {
    flex-direction: column;
  }
}
</style>
