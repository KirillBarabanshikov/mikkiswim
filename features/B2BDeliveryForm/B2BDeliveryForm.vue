<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import type { Address } from '~/entities/address/model/Address'
import { DeviceSize, useSizeWindow } from '~/share/utils/useSizeWindow'

const props = defineProps<{
  items: {
    product: {
      id: number
      title: string
      price: number
      oldPrice: number | null
      viewers: number
      images: { image: string }[]
      slug: string
      weight: number
      length: number
      width: number
      height: number
    }
    quantity: number
    size: string
  }[]
  selectedAddress: Address | null
  steps: Array<{ step: string; title: string }>
  currentStep: { step: string; title: string }
}>()

const emit = defineEmits(['next'])

const router = useRouter()
const { deviceSize } = useSizeWindow()

const deliveryOptions = ref([
  { id: 1, title: 'Деловые Линии' },
  { id: 2, title: 'Байкал Сервис' },
  { id: 3, title: 'ЖелДорЭкспедиция' },
  { id: 4, title: 'Яндекс Доставка' },
  { id: 5, title: 'СДЭК' },
  { id: 6, title: 'Почта России' },
  { id: 7, title: 'Боксбери' },
  { id: 8, title: 'Другой способ' }
])

const selectedDelivery = ref<string | null>(null)
const customDelivery = ref('')
const isPersonalDataAgreed = ref(false)
const showCommentInput = ref(false)
const comment = ref('')

const selectDelivery = (option: string) => {
  selectedDelivery.value = option
  if (option !== 'Другой способ') {
    customDelivery.value = ''
  }
}

const goToContacts = () => {
  router.push('/contacts')
}

const onSubmit = () => {
  if (!isPersonalDataAgreed.value) {
    return
  }
  console.log({
    delivery:
      selectedDelivery.value === 'Другой способ'
        ? customDelivery.value
        : selectedDelivery.value,
    comment: comment.value,
    items: props.items,
    address: props.selectedAddress
  })
  emit('next')
}
</script>

<template>
  <section
    :class="['delivery', { 'mobile-view': deviceSize <= DeviceSize.MOBILE }]"
  >
    <div v-if="deviceSize <= DeviceSize.MOBILE" class="form-header">
      Оформление заказа
      <div class="stepper">
        <div class="steps">
          <div
            v-for="step in steps"
            :key="step.step"
            class="steps-item"
            :class="{ active: currentStep.step === step.step }"
          >
            <span>{{ step.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="delivery-content">
      <div class="delivery-title">Способ доставки</div>
      <div class="delivery-options">
        <div
          v-for="option in deliveryOptions"
          :key="option.id"
          class="delivery-option"
          :class="{ selected: selectedDelivery === option.title }"
          @click="selectDelivery(option.title)"
        >
          {{ option.title }}
        </div>
        <input
          v-if="selectedDelivery === 'Другой способ'"
          v-model="customDelivery"
          class="custom-delivery-input"
          placeholder="Укажите способ доставки"
        />
      </div>

      <div class="delivery-checkboxes">
        <label class="checkbox-label">
          <input type="checkbox" v-model="isPersonalDataAgreed" />
          Согласен на обработку моих персональных данных
        </label>
        <label
          class="checkbox-label"
          @click="showCommentInput = !showCommentInput"
        >
          <input type="checkbox" :checked="showCommentInput" />
          Комментарий к заказу
        </label>
        <input
          v-if="showCommentInput"
          v-model="comment"
          class="comment-input"
          placeholder="Введите комментарий"
        />
      </div>

      <div class="delivery-contacts">
        <div class="contacts-text">
          <p class="contacts-question">Возникли вопросы?</p>
          <Button outline class="contacts-button" @click="goToContacts">
            Контакты
          </Button>
        </div>
        <p class="delivery-note">
          Расчет стоимости доставки проведет ваш личный менеджер и свяжется с
          вами в ближайшее время для согласования деталей и стоимости доставки.
        </p>
      </div>

      <Button
        variant="black"
        class="submit-button"
        @click="onSubmit"
        :disabled="!selectedDelivery || !isPersonalDataAgreed"
      >
        Оформить заказ
      </Button>
    </div>
  </section>
</template>

<style lang="scss">
@use '/app/assets/scss/variables' as *;

.delivery {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &.mobile-view {
    padding: 16px;
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 555px;

    &.mobile-view {
      width: 100%;
    }
  }

  &-title {
    font-weight: 700;
    font-size: 14px;
    color: var(--gray);
  }

  &-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  &-option {
    padding: 12px;
    text-align: center;
    border: 1px solid var(--gray-400);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;

    &:hover {
      border-color: var(--black);
    }

    &.selected {
      background: var(--green);
      color: var(--white);
      border-color: var(--green);
    }
  }

  &-checkboxes {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    cursor: pointer;

    input[type='checkbox'] {
      width: 16px;
      height: 16px;
    }
  }

  .custom-delivery-input,
  .comment-input {
    width: 100%;
    padding: 9px 16px;
    font-size: 14px;
    border: 1px solid var(--gray-400);
    border-radius: 30px;
    margin-top: 8px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: var(--black);
      outline: none;
    }
  }

  &-contacts {
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .contacts-text {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .contacts-question {
    font-weight: 700;
    font-size: 16px;
  }

  .contacts-button {
    width: 214px;
    margin: 0 auto;
    color: var(--gray);
  }

  &-note {
    font-size: 14px;
    color: var(--gray);
  }

  .submit-button {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  .form-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 700;
    font-size: 19px;
    line-height: 150%;
    text-align: center;
  }

  .stepper {
    display: flex;
    justify-content: center;
    margin: 24px 0;
  }

  .steps {
    display: flex;
    align-items: center;
    gap: 8px;

    &-item {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 14px;
      color: var(--gray-400);

      &.active {
        color: var(--black);
      }
    }
  }

  @media (max-width: #{$md2 + px}) {
    &-options {
      grid-template-columns: repeat(2, 1fr);
    }

    &-content {
      width: 100%;
    }
  }

  @media (max-width: #{$md3 + px}) {
    &-options {
      grid-template-columns: 1fr;
    }
  }
}
</style>
