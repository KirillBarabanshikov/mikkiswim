<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import type { Address } from '~/entities/address/model/Address'
import { DeviceSize, useSizeWindow } from '~/share/utils/useSizeWindow'
import TempCheckbox from '~/pages/b2b/tempCheckbox.vue'

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

const emit = defineEmits(['next', 'submit'])

const router = useRouter()
const { deviceSize } = useSizeWindow()

const deliveryOptions = ref([
  { id: 1, src: '/img/B2B_page/DelovyeLinii.svg', title: 'Деловые Линии' },
  { id: 2, src: '/img/B2B_page/BaikalServis.svg', title: 'Байкал Сервис' },
  { id: 3, src: '/img/B2B_page/ZhelDorExp.svg', title: 'ЖелДорЭкспедиция' },
  { id: 4, src: '/img/B2B_page/YandexDelivery.svg', title: 'Яндекс доставка' },
  { id: 5, src: '/img/B2B_page/Cdek.svg', title: 'Cdek' },
  { id: 6, src: '/img/B2B_page/PochtaRussia.svg', title: 'Почта России' },
  { id: 7, src: '/img/B2B_page/Boxberry.svg', title: 'Boxberry' },
  {
    id: 8,
    src: null,
    title: '<b>Другой способ</b><p>Укажите способ доставки</p>'
  }
])

const selectedDelivery = ref<string | null>(null)
const customDelivery = ref('')
const isPersonalDataAgreed = ref(false)
const showCommentInput = ref(false)
const comment = ref('')

const selectDelivery = (option: string) => {
  const cleanTitle = option.replace(/<b>(.*?)<\/b><p>.*<\/p>/, '$1')
  selectedDelivery.value = cleanTitle
  console.log('Selected delivery:', selectedDelivery.value)
  if (cleanTitle !== 'Другой способ') {
    customDelivery.value = ''
  }
}

const goToContacts = () => {
  router.push('/contacts')
}

const onSubmit = () => {
  if (!isPersonalDataAgreed.value) {
    console.log('Согласие не получено')
    return
  }
  const deliveryData = {
    deliveryService:
      selectedDelivery.value === 'Другой способ'
        ? customDelivery.value
        : selectedDelivery.value,
    comment: comment.value
  }
  console.log('Submitting delivery data:', deliveryData)
  emit('submit', deliveryData)
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
          :class="{
            selected:
              selectedDelivery ===
              option.title.replace(/<b>(.*?)<\/b><p>.*<\/p>/, '$1')
          }"
          @click="selectDelivery(option.title)"
        >
          <img
            v-if="option.src"
            :src="option.src"
            :alt="option.title"
            class="delivery-image"
          />
          <div v-else class="custom-option" v-html="option.title"></div>
        </div>
        <input
          v-if="selectedDelivery === 'Другой способ'"
          v-model="customDelivery"
          class="custom-delivery-input"
          placeholder="Укажите способ доставки"
        />
      </div>

      <div class="delivery-checkboxes">
        <tempCheckbox
          name="personalData"
          label="Я согласен на обработку моих персональных данных"
          v-model="isPersonalDataAgreed"
          @change="console.log('Personal data agreed:', isPersonalDataAgreed)"
        />
        <Checkbox
          name="comment"
          label="Комментарий к заказу"
          :default-checked="showCommentInput"
          @click="showCommentInput = !showCommentInput"
        />
        <input
          v-if="showCommentInput"
          v-model="comment"
          class="comment-input"
          placeholder="Введите комментарий"
        />
      </div>

      <div class="delivery-contacts">
        <div class="contacts-text">
          <b class="contacts-question">
            Возникли вопросы по поводу доставки?
            <span>Позвоните или напишите нам</span>
          </b>
          <Button
            color="white-gray"
            class="contacts-button"
            @click="goToContacts"
          >
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

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.delivery {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 32px;

    .custom-delivery-input {
      grid-column: 1 / -1;
    }
  }

  &-option {
    padding: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 60px;
    background-color: var(--gray-300);

    &:hover {
      border-color: var(--black);
    }

    &.selected {
      background: var(--green);
      border-color: var(--green);

      .delivery-image {
        filter: brightness(0) invert(1);
      }

      .custom-option {
        color: var(--white);

        b {
          color: var(--white);
        }

        p {
          color: var(--white);
        }
      }
    }
  }

  &-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .custom-option {
    text-align: center;
    font-size: 14px;

    b {
      font-weight: 700;
    }

    p {
      font-size: 12px;
      margin: 4px 0 0 0;
      color: var(--gray);
    }
  }

  &-checkboxes {
    display: flex;
    flex-direction: column;
    gap: 16px;
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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }

  .contacts-question {
    font-weight: 700;
    font-size: 14px;
    line-height: 155%;

    span {
      font-weight: 400;
    }
  }

  .contacts-button {
    width: 214px;
  }

  &-note {
    text-align: left;
    font-size: 14px;
    line-height: 155%;
  }

  .submit-button {
    margin-top: 16px;
    align-self: center;
    width: 261px;
    margin-bottom: -32px;
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

      .custom-delivery-input {
        grid-column: 1 / -1;
      }
    }

    &-content {
      width: 100%;
    }

    .contacts-text {
      text-align: center;
      width: 100%;
      flex-direction: column;
      gap: 4px;
    }
  }

  @media (max-width: #{$md3 + px}) {
    &-options {
      grid-template-columns: 1fr;

      .custom-delivery-input {
        grid-column: 1 / -1;
      }
    }
  }
}
</style>
