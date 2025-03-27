<script setup lang="ts">
import {
  type GenericObject,
  type InvalidSubmissionContext,
  useForm
} from 'vee-validate'
import * as yup from 'yup'

import { useChangeEmail } from '~/entities/user/api/query'
import { useUserStore } from '~/share/store/userStore'

interface FormScheme {
  currentEmail: string
  newEmail: string
  repeatNewEmail: string
}

const userStore = useUserStore()
const { mutate, isPending, isError, error } = useChangeEmail()

const validationSchema = yup.object({
  currentEmail: yup
    .string()
    .required('Заполнить обязательно')
    .email('Email некорректный')
    .test(
      'match-current',
      'Текущий email не совпадает',
      (value) => value === userStore.user?.email
    ),
  newEmail: yup
    .string()
    .required('Заполнить обязательно')
    .email('Email некорректный')
    .notOneOf(
      [yup.ref('currentEmail')],
      'Новый email должен отличаться от текущего'
    ),
  repeatNewEmail: yup
    .string()
    .required('Заполнить обязательно')
    .email('Email некорректный')
    .oneOf([yup.ref('newEmail')], 'Email должны совпадать')
})

const { handleSubmit, resetForm } = useForm({
  validationSchema,
  initialValues: {
    currentEmail: userStore.user?.email,
    newEmail: '',
    repeatNewEmail: ''
  }
})

const onSubmitSuccess = (values: FormScheme) => {
  mutate(
    {
      email: values.newEmail,
      emailConfirmation: values.repeatNewEmail
    },
    {
      onSuccess: () => {
        userStore.updateEmail(values.newEmail)
        resetForm({
          values: {
            currentEmail: values.newEmail,
            newEmail: '',
            repeatNewEmail: ''
          }
        })
      },
      onError: (error) => {
        console.error('Error changing email:', error)
      }
    }
  )
}

const onSubmitError = (ctx: InvalidSubmissionContext) => {
  console.error('Validation errors:', ctx.errors)
}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="form">
      <Input
        name="currentEmail"
        placeholder="Текущая электронная почта*"
        disabled
      />
      <Input name="newEmail" placeholder="Новый адрес электронной почты*" />
      <Input
        name="repeatNewEmail"
        placeholder="Повторите новый адрес электронной почты*"
      />
    </div>
    <p>* – Обязательные к заполнению поля</p>
    <Button
      type="submit"
      variant="black"
      class="btn-submit"
      :disabled="isPending"
    >
      {{ isPending ? 'Сохранение...' : 'Сохранить' }}
    </Button>

    <div v-if="isError" class="error-message">
      {{ error.response?.data?.message || 'Ошибка при изменении email' }}
    </div>
  </form>
</template>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}

.btn {
  &-submit {
    max-width: 153px;
  }
}

p {
  margin: 16px 0;
  color: var(--gray);
  font-weight: 400;
  font-size: 12px;
  line-height: 155%;
}
</style>
