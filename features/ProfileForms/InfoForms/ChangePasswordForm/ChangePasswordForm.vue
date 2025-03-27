<script setup lang="ts">
import {
  type GenericObject,
  type InvalidSubmissionContext,
  useForm
} from 'vee-validate'
import * as yup from 'yup'

import { useChangePassword } from '~/entities/user/api/query'

interface FormScheme {
  currentPassword: string
  newPassword: string
  repeatNewPassword: string
}

const { mutate, isPending, isError, error } = useChangePassword()

const noRepeatedChars = (value: string) => !/(.)\1{3}/.test(value)

const validationSchema = yup.object({
  currentPassword: yup
    .string()
    .required('Заполнить обязательно')
    .min(3, 'Минимум 3 символа'),
  newPassword: yup
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
  repeatNewPassword: yup
    .string()
    .required('Заполнить обязательно')
    .oneOf([yup.ref('newPassword')], 'Пароли должны совпадать')
})

const { handleSubmit, resetForm } = useForm({
  validationSchema,
  initialValues: {
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  }
})

const onSubmitSuccess = (values: FormScheme) => {
  mutate(
    {
      password: values.newPassword,
      passwordConfirmation: values.repeatNewPassword
    },
    {
      onSuccess: () => {
        resetForm({
          values: {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: ''
          }
        })
      },
      onError: (error) => {
        console.error('Error changing password:', error)
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
    <Input
      name="currentPassword"
      type="password"
      placeholder="Текущий пароль*"
    />
    <Input name="newPassword" type="password" placeholder="Новый пароль*" />
    <Input
      name="repeatNewPassword"
      type="password"
      placeholder="Повторите пароль*"
    />
    <div v-if="error" class="warning">
      Пароль должен включать как минимум 8 символов, в том числе одну заглавную
      букву, одну строчную букву и одну цифру. Пожалуйста, не повторяйте один и
      тот же символ более трех раз.
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
  </form>
</template>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.btn {
  &-submit {
    max-width: 153px;
  }
}

p {
  color: var(--gray);
  font-weight: 400;
  font-size: 12px;
  line-height: 155%;
}

.warning {
  font-size: 12px;
  line-height: 155%;
  color: var(--red);
}
</style>
