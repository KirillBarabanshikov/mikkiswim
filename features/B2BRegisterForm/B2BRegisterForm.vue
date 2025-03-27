<script setup lang="ts">
import {
  type GenericObject,
  type InvalidSubmissionContext,
  useForm
} from 'vee-validate'
import * as yup from 'yup'

import { useRegisterB2B } from '~/entities/user-b2b/api/query'
import type { FormScheme } from '~/features/B2BRegisterForm/types'
import B2BRegisterPopup from '~/features/B2BRegisterForm/ui/B2BRegisterPopup/B2BRegisterPopup.vue'

const isSuccess = ref(false)

const closePopup = () => {
  isSuccess.value = false
  navigateTo('/b2b')
}

const model = ref<FormScheme>({
  username: '',
  password: '',
  passwordRepeat: '',
  name: '',
  surname: '',
  email: '',
  phone: '',
  companyName: '',
  legalAddress: '',
  mailingAddress: '',
  bankName: '',
  bankAddress: '',
  paymentAccount: '',
  correspondentAccount: '',
  ceoName: '',
  inn: '',
  ogrn: '',
  companySite: '',
  companyPhone: '',
  companyEmail: ''
})

const noRepeatedChars = (value: string) => !/(.)\1{3}/.test(value)

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Заполнить обязательно')
    .email('Email некорректный')
    .min(3, 'Минимум 3 символа'),
  username: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  password: yup
    .string()
    .required('Заполнить обязательно')
    .min(8, 'Минимум 8 символов')
    .matches(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква')
    .matches(/[a-z]/, 'Должна быть хотя бы одна строчная буква')
    .matches(/[0-9]/, 'Должна быть хотя бы одна цифра')
    .test(
      'no-repeats',
      'Нельзя использовать один символ более 3 раз подряд',
      noRepeatedChars
    ),
  passwordRepeat: yup
    .string()
    .required('Заполнить обязательно')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  name: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  surname: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  phone: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  companyName: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  legalAddress: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  mailingAddress: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  bankName: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  bankAddress: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  paymentAccount: yup
    .string()
    .required('Заполнить обязательно')
    .min(20, 'Минимум 20 символов')
    .max(20, 'Максимум 20 символов'),
  correspondentAccount: yup
    .string()
    .required('Заполнить обязательно')
    .min(20, 'Минимум 20 символов')
    .max(20, 'Максимум 20 символов'),
  ceoName: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  inn: yup
    .string()
    .required('Заполнить обязательно')
    .test('inn-length', 'ИНН должен содержать 10 или 12 цифр', (value) =>
      value ? value.length === 10 || value.length === 12 : false
    ),
  ogrn: yup
    .string()
    .required('Заполнить обязательно')
    .test('ogrn-length', 'ИНН должен содержать 13 или 15 цифр', (value) =>
      value ? value.length === 13 || value.length === 15 : false
    ),
  companySite: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  companyPhone: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  companyEmail: yup
    .string()
    .email('Email некорректный')
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа')
})

const { mutate: sendB2BForm, isPending, isError } = useRegisterB2B()

const { handleSubmit, values, resetForm } = useForm({
  validationSchema,
  initialValues: model.value
})

const onSubmitSuccess = (values: GenericObject) => {
  console.log(values)
  sendB2BForm(values, {
    onSuccess: () => {
      isSuccess.value = true
      console.log(values)
      resetForm()
    }
  })
}
const onSubmitError = (ctx: InvalidSubmissionContext) => {}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <div v-if="isSuccess">
    <B2BRegisterPopup @close="closePopup" />
  </div>
  <div class="content">
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-item">
        <div class="form-label">Вход в учетную запись</div>
        <div class="form-inputs_grid">
          <Input name="email" placeholder="Email*" />
          <Input name="password" type="password" placeholder="Пароль*" />
          <Input name="username" placeholder="Логин*" />
          <Input
            name="passwordRepeat"
            type="password"
            placeholder="Повторите пароль*"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">Личные данные</div>
        <div class="form-inputs_grid">
          <Input name="name" placeholder="Имя*" />
          <Input name="surname" placeholder="Фамилия*" />
          <Input
            name="phone"
            maska="+7(###)-###-##-##"
            placeholder="Телефон*"
          />
        </div>
      </div>

      <div class="form-item">
        <div class="form-label">Реквизиты компании</div>
        <div class="form-inputs_flex">
          <Input name="companyName" placeholder="Компания*" />
          <div class="form-inputs_grid">
            <Textarea name="legalAddress" placeholder="Юридический адрес*" />
            <Textarea name="mailingAddress" placeholder="Почтовый адрес*" />
          </div>
          <Input name="bankName" placeholder="Банк*" />
          <Input name="bankAddress" placeholder="Адрес банка*" />
          <div class="form-inputs_grid">
            <Input name="paymentAccount" placeholder="Р/с*" />
            <Input name="inn" placeholder="ИНН*" />
            <Input name="correspondentAccount" placeholder="К/с*" />
            <Input name="ogrn" placeholder="ОГРН*" />
            <Input name="ceoName" placeholder="Директор*" />
            <Input name="companySite" placeholder="Сайт*" />
            <Input
              maska="+7(###)-###-##-##"
              name="companyPhone"
              placeholder="Контактный телефон*"
            />
            <Input name="companyEmail" placeholder="Контактный email*" />
          </div>
        </div>
      </div>

      <div class="form-description">* - Поля обязательные к заполнению.</div>
      <div class="error-message" v-if="isError">Пароль слишком простой</div>
      <div class="form-actions">
        <Button
          variant="black"
          size="small"
          class="form-btn"
          type="submit"
          :disabled="isPending"
        >
          {{ isPending ? 'Отправка...' : 'Зарегистрироваться' }}
        </Button>
      </div>
    </form>
    <div class="button-back">
      <Button color="white-gray" @click="navigateTo('/')">Назад</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'B2BRegisterForm';
</style>
