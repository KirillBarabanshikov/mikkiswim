<script setup lang="ts">
import {
  type GenericObject,
  type InvalidSubmissionContext,
  useForm
} from 'vee-validate'
import * as yup from 'yup'

import { useAuth } from '~/share/query/auth/useAuth'
import type { FormScheme } from '~/widgets/Authentication/Components/RegistrationForm/types'

type FEmits = {
  (eventName: 'onSuccessCreate'): void
  (eventName: 'onErrorCreate'): void
}

const emits = defineEmits<FEmits>()

const registerMutation = useAuth(false)

const model = ref<FormScheme>({
  username: '',
  password: '',
  email: '',
  check: false
})
const { handleSubmit, values } = useForm({
  initialValues: model.value
})

const onSubmitSuccess = (values: GenericObject) => {
  console.log(values)
  registrationUser()
  // .then(() => emits('onSuccessCreate'))
  // .catch(() => emits('onErrorCreate'))
}

const noRepeatedChars = (value: string) => !/(.)\1{3}/.test(value)

const registrationUser = () => {
  registerMutation.mutate(
    {
      username: model.value.username,
      password: model.value.password,
      email: model.value.email
    },
    {
      onSuccess: () => emits('onSuccessCreate'),
      onError: () => emits('onErrorCreate')
    }
  )
}
const onSubmitError = (ctx: InvalidSubmissionContext) => {}

const showError = ref(false)

watch(
  () => registerMutation.isError.value,
  (isError) => {
    if (isError) {
      showError.value = true
      setTimeout(() => {
        showError.value = false
      }, 3000)
    }
  }
)

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <div class="signin">
    <form class="signin-form" @submit.prevent="onSubmit">
      <div class="form-inputs">
        <Input
          v-model="model.email"
          placeholder="Email"
          name="email"
          :validator="
            yup
              .string()
              .required('Заполнить обязательно')
              .email('Email некорректный')
              .min(3, '3 минимум')
          "
        />
        <Input
          v-model="model.username"
          placeholder="Логин"
          name="username"
          :validator="
            yup.string().required('Заполнить обязательно').min(3, '3 минимум')
          "
        />
        <Input
          v-model="model.password"
          placeholder="Пароль"
          type="password"
          name="password"
          :validator="
            yup
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
              )
          "
        />
      </div>
      <div class="password-hint">
        Не менее восьми символов, в том числе как минимум одна строчная буква,
        одна прописная буква и одна цифра. Не повторяйте один и тот же символ
        более трех раз
        <div v-if="showError" class="error-message">Пароль слишком простой</div>
      </div>
      <div class="terms-block">
        <div class="checkbox">
          <Checkbox
            name="check"
            type="checkbox"
            :validator="yup.boolean().oneOf([true], 'Обязательно')"
          />
        </div>
        <div class="privacy-policy">
          Я прочел и принимаю
          <span>Политику конфиденциальности</span>
        </div>
      </div>
      <Button type="submit" :disabled="registerMutation.isPending.value"
        >Создать учетную запись
      </Button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use 'RegistrationForm';
</style>
