<script setup lang="ts">
import { type InvalidSubmissionContext, useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import * as yup from 'yup'

const { width } = useWindowSize()

import {
  useCertificateListing,
  useCertificatePreview
} from '~/entities/certificate/api/query'
import type {
  CertificateListing,
  CertificatePreview,
  FormScheme
} from '~/features/CertificateForm/types'
import { useUserStore } from '~/share/store/userStore'
import IconMikki from '~/share/UI/Icons/IconMikki.vue'

const route = useRoute()
const userStore = useUserStore()

const {
  public: { API }
} = useRuntimeConfig()

const prices = [
  { id: 1, content: '1 500', value: 1500 },
  { id: 2, content: '2 000', value: 2000 },
  { id: 3, content: '3 000', value: 3000 },
  { id: 4, content: '4 000', value: 4000 },
  { id: 5, content: '5 000', value: 5000 },
  { id: 6, content: '6 000', value: 6000 },
  { id: 7, content: '7 000', value: 7000 },
  { id: 8, content: '10 000', value: 10000 }
]

const model = ref<FormScheme>({
  email: '',
  name: '',
  price: null,
  after: false,
  message: '',
  date: null,
  time: ''
})

const isMobile = computed(() => width.value <= 768)

const { mutate: previewCertificate, isPending: isPreviewLoading } =
  useCertificatePreview()
const { mutate: buyCertificate, isPending: isBuyLoading } =
  useCertificateListing()

const { handleSubmit, values, setValues } = useForm<FormScheme>({
  initialValues: model.value
})

watch(
  values,
  (newValues) => {
    if (JSON.stringify(newValues) !== JSON.stringify(model.value)) {
      model.value = { ...newValues }
    }
  },
  { deep: true }
)

const onSubmitSuccess = () => {
  const formattedModel: CertificateListing = {
    id: +route.params.id,
    price: model.value.price?.value || 0,
    dateTimeAt: model.value.date
      ? `${model.value.date.year}-${String(model.value.date.month).padStart(2, '0')}-${String(model.value.date.day).padStart(2, '0')}T${model.value.time || '00:00'}:00`
      : '0000-00-00T00:00:00',
    after: model.value.after,
    message: model.value.message || '',
    email: model.value.email,
    name: model.value.name
  }

  buyCertificate(formattedModel, {
    onSuccess: (data) => {
      console.log('✅ Оплата прошла успешно:', data)
    },
    onError: (error) => {
      console.error('❌ Ошибка оплаты:', error)
    }
  })
}

const onSubmitError = (ctx: InvalidSubmissionContext) => {
  console.error('Ошибка валидации:', ctx)
}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)

const handlePreview = () => {
  const formattedModel: CertificatePreview = {
    id: +route.params.id,
    price: model.value.price?.value || 0
  }

  previewCertificate(formattedModel, {
    onSuccess: (data) => {
      window.open(API + data.pdfUrl, '_blank')
    },
    onError: (error) => console.error('Ошибка предпросмотра:', error)
  })
}

const bonusPoints = computed(() => {
  if (!model.value.price || !userStore?.user?.loyaltyProgram?.discount) {
    return 0
  }
  const priceValue = Number(model.value.price.content.replace(/\s/g, ''))
  const discount = Number(userStore.user.loyaltyProgram.discount)
  return Math.floor(priceValue * discount)
})
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-item">
      <div class="form-label">Номинал, ₽</div>
      <ToggleGroup
        name="price"
        v-model="model.price"
        :list="prices"
        type="single"
        variant="buttons"
        :grid="isMobile ? 3 : 4"
        :validator="
          yup.object().shape({
            id: yup.number().required('Выберите номинал'),
            content: yup.string().required('Выберите номинал')
          })
        "
      />
    </div>

    <div class="form-item">
      <div class="form-label">Имя отправителя</div>
      <Input
        v-model="model.name"
        :validator="
          yup.string().required('Заполнить обязательно').min(3, '3 минимум')
        "
        name="name"
        placeholder="Введите имя"
      />
    </div>
    <div class="form-item">
      <div class="form-label">Способ доставки</div>
      <Input
        v-model="model.email"
        :validator="
          yup
            .string()
            .required('Заполнить обязательно')
            .email('Email некорректный')
            .min(3, '3 минимум')
        "
        name="email"
        placeholder="Введите e-mail адрес"
      />
    </div>

    <div class="form-description">
      Сертификат будет доставлен в электронном письме на указанный e - mail
      адрес
    </div>

    <div class="form-item">
      <div class="form-label">Дата и время отправки</div>
      <div class="form-flex">
        <DatePicker
          name="date"
          placeholder="Дата"
          :validator="yup.string().required('Дата обязательна')"
        />
        <Input
          type="text"
          name="time"
          placeholder="Время"
          maska="##:##"
          :validator="
            yup
              .string()
              .min(5, 'Время обязательно')
              .required('Время обязательно')
          "
        />
      </div>
    </div>

    <div class="form-item">
      <Checkbox
        name="after"
        label="Отправить сертификат на почту сразу после оплаты"
      />
    </div>

    <div class="form-item">
      <div class="form-label">Сообщение для получателя</div>
      <Textarea
        name="message"
        :validator="yup.string().max(288, 'Максимально 288 символов')"
        placeholder="Максимум 288 символов, не более трёх строк "
      />
    </div>

    <TransitionGroup name="slide">
      <div v-if="model.price" class="form-description">
        <div class="text">
          Сертификат <span>{{ model.price.content }} ₽</span>
        </div>
        <div class="text">Доставка на эл. почту <span>Бесплатно</span></div>
      </div>

      <div v-if="model.price" class="form-price">
        <div class="price">
          Итого <span>{{ model.price.content }} ₽</span>
        </div>
        <div v-if="model.price && userStore.user" class="text">
          Начислим миккикоинов
          <span>{{ bonusPoints }}<IconMikki /></span>
        </div>
      </div>
    </TransitionGroup>

    <div class="form-actions">
      <Button
        variant="black"
        size="small"
        class="form-btn"
        :disabled="isPreviewLoading"
        @click="handlePreview"
      >
        {{ isPreviewLoading ? 'Создание предпросмотра...' : 'Предпросмотр' }}
      </Button>

      <Button
        variant="black"
        size="small"
        class="form-btn"
        :disabled="isBuyLoading"
        type="submit"
      >
        {{ isBuyLoading ? 'Оплата...' : 'Оплатить' }}
      </Button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@use 'CertificateForm';
</style>
