<script setup lang="ts">
import {
  type GenericObject,
  type InvalidSubmissionContext,
  useForm
} from 'vee-validate'
import * as yup from 'yup'

import { useAddReview } from '~/entities/review/api/query'
import { useRegisterPartner } from '~/entities/user-partner/api/query'
import type { FormScheme } from '~/features/PartnerRegisterForm/types'
import PartnerRegisterPopup from '~/features/PartnerRegisterForm/ui/PartnerRegisterPopup/PartnerRegisterPopup.vue'
import IconClip from '~/share/UI/Icons/IconClip.vue'

const { mutate: sendPartnerForm, isPending, isError } = useRegisterPartner()

const isSuccess = ref(false)

const closePopup = () => {
  isSuccess.value = false
}

const passportImage = ref<string | null>(null)
const passportFileInput = ref<HTMLInputElement | null>(null)
const setPassportFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  passportImage.value = URL.createObjectURL(file)
  setFieldValue('imagePassportFile', file)
}
const removePassportFile = () => {
  passportImage.value = null
  if (passportFileInput.value) {
    passportFileInput.value.value = ''
  }
  setFieldValue('imagePassportFile', null)
}

const docsImage = ref<string | null>(null)
const docsFileInput = ref<HTMLInputElement | null>(null)
const setDocsFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  docsImage.value = URL.createObjectURL(file)
  setFieldValue('imageFile', file)
}
const removeDocsFile = () => {
  docsImage.value = null
  if (docsFileInput.value) {
    docsFileInput.value.value = ''
  }
  setFieldValue('imageFile', null)
}

const model = ref<FormScheme>({
  username: '',
  password: '',
  passwordRepeat: '',
  email: '',
  name: '',
  surname: '',
  city: '',
  birthdayAt: '',
  phone: '',
  imagePassportFile: null,
  organization: '',
  sportsmansCount: 0,
  link: '',
  qualification: '',
  imageFile: null,
  comment: ''
})

const noRepeatedChars = (value: string) => !/(.)\1{3}/.test(value)

const validationSchema = yup.object({
  username: yup.string().required('Заполнить обязательно').min(3, '3 минимум'),
  name: yup.string().required('Заполнить обязательно').min(3, '3 минимум'),
  surname: yup.string().required('Заполнить обязательно').min(3, '3 минимум'),
  city: yup.string().required('Заполнить обязательно').min(3, '3 минимум'),
  birthdayAt: yup.string().required('Заполнить обязательно'),
  phone: yup.string().required('Заполнить обязательно').min(3, '3 минимум'),
  imagePassportFile: yup.string().required('Заполнить обязательно'),
  organization: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, '3 минимум'),
  sportsmansCount: yup
    .number()
    .typeError('Количество должно быть числом!')
    .required('Введите количество')
    .min(0, 'Минимум 1')
    .max(5000, 'Слишком много'),
  qualification: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, '3 минимум'),
  imageFile: yup.string().required('Заполнить обязательно'),
  email: yup
    .string()
    .required('Заполнить обязательно')
    .email('Email некорректный'),
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
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
})

const { handleSubmit, values, setFieldValue, resetForm } = useForm<FormScheme>({
  validationSchema,
  initialValues: {
    username: '',
    password: '',
    passwordRepeat: '',
    email: '',
    name: '',
    surname: '',
    city: '',
    birthdayAt: '',
    phone: '',
    imagePassportFile: '',
    organization: '',
    sportsmansCount: null,
    link: '',
    qualification: '',
    imageFile: '',
    comment: ''
  }
})

const onSubmitSuccess = (values: GenericObject) => {
  const formData = new FormData()

  formData.append('username', values.username)
  formData.append('password', values.password)
  formData.append('email', values.email)
  formData.append('name', values.name)
  formData.append('surname', values.surname)
  formData.append('city', values.city)
  formData.append('birthdayAt', values.birthdayAt)
  formData.append('phone', values.phone)
  formData.append('imagePassportFile', values.imagePassportFile)
  formData.append('organization', values.organization)
  formData.append('sportsmansCount', values.sportsmansCount)
  formData.append('link', values.link)
  formData.append('qualification', values.qualification)
  formData.append('imageFile', values.imageFile)
  formData.append('comment', values.comment)

  sendPartnerForm(formData, {
    onSuccess: () => {
      isSuccess.value = true
      console.log(values)
      resetForm()
      passportImage.value = null
      docsImage.value = null
    }
  })
}
const onSubmitError = (ctx: InvalidSubmissionContext) => {
  console.error('Validation errors:', ctx.errors)
}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <div class="register-form">
    <Transition name="fade">
      <div v-if="isSuccess" class="register-form-popup">
        <PartnerRegisterPopup @close="closePopup" />
      </div>
    </Transition>
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
            <DatePicker name="birthdayAt" placeholder="Дата рождения" />
            <Input name="surname" placeholder="Фамилия*" />
            <Input
              name="phone"
              maska="+7(###)-###-##-##"
              placeholder="Телефон*"
            />
            <Input name="city" placeholder="Город*" />
            <div class="file-input">
              <input
                ref="passportFileInput"
                type="file"
                accept=".jpg, .jpeg, .png, .bmp, .gif, .webp, .pdf"
                @change="setPassportFile"
                :style="{ pointerEvents: passportImage ? 'none' : 'auto' }"
              />
              <div v-if="!passportImage" class="input-content">
                Прикрепить фото* <span>(селфи с паспортом)</span>
                <IconClip />
              </div>
              <div v-else class="preview">
                <img :src="passportImage" alt="Выбранное фото" />
                <button type="button" @click="removePassportFile">
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="form-item">
          <div class="form-label">О тренере</div>
          <div class="form-inputs_flex">
            <Input
              name="organization"
              placeholder="Название организации в которой вы работаете тренером*"
            />
            <Input
              name="sportsmansCount"
              placeholder="Количество спортсменов с которыми вы работаете*"
            />
            <Input
              name="link"
              placeholder="Ссылка на личные соц. сети (если имеется)"
            />
            <Input name="qualification" placeholder="Ваша квалификация*" />
            <div class="file-input">
              <input
                ref="docsFileInput"
                type="file"
                accept=".jpg, .jpeg, .png, .bmp, .gif, .webp"
                @change="setDocsFile"
                :style="{ pointerEvents: docsImage ? 'none' : 'auto' }"
              />
              <div v-if="!docsImage" class="input-content">
                Документ подтверждающий факт работы тренером - трудовой договор*
                <IconClip />
              </div>
              <div v-else class="preview">
                <img :src="docsImage" alt="Выбранный документ" />
                <button type="button" @click="removeDocsFile">Удалить</button>
              </div>
            </div>
          </div>
        </div>

        <div class="form-comment">
          <Input name="comment" placeholder="Комментарий (не обязательно)" />
        </div>

        <div class="form-description">* - Поля обязательные к заполнению.</div>
        <div v-if="isError" class="error-message">Пароль слишком простой</div>
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
  </div>
</template>

<style scoped lang="scss">
@use 'PartnerRegisterForm';
</style>
