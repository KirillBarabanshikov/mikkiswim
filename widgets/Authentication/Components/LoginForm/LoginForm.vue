<script setup lang="ts">
import {
  type GenericObject,
  type InvalidSubmissionContext,
  useForm
} from 'vee-validate'
import * as yup from 'yup'

import { useRuntimeConfig } from '#app'
import { useAuth } from '~/share/query/auth/useAuth'
import { useAuthStore } from '~/share/store/authStore'
import type { FormScheme } from '~/widgets/Authentication/Components/LoginForm/types'

const emits = defineEmits<FEmits>()
const authStore = useAuthStore()
const config = useRuntimeConfig()
const apiUrl = config.public.API
const loginMutation = useAuth(true, apiUrl)

type FEmits = {
  (eventName: 'onForgotPassword'): void
  (eventName: 'onRegistration'): void
  (eventName: 'onSuccessCreate'): void
  (eventName: 'onErrorCreate'): void
  (eventName: 'onCooperation'): void
}
const onRegistration = () => emits('onRegistration')
const onCooperation = () => emits('onCooperation')
const onForgotPassword = () => emits('onForgotPassword')

const model = ref<FormScheme>({
  username: '',
  password: ''
})
const { handleSubmit } = useForm({
  initialValues: model.value
})

const onSubmitSuccess = (values: GenericObject) => {
  console.log(values)
  loginUser()
}

const loginUser = () => {
  loginMutation.mutate(
    {
      username: model.value.username,
      password: model.value.password
    },
    {
      onSuccess: (e) => {
        authStore.login(e, apiUrl)
      },
      onError: () => emits('onErrorCreate')
    }
  )
}
const onSubmitError = (ctx: InvalidSubmissionContext) => {
  console.error('Validation errors:', ctx.errors)
}

const showError = ref(false)

watch(
  () => loginMutation.isError.value,
  (isError) => {
    if (isError) {
      showError.value = true
      setTimeout(() => {
        showError.value = false
      }, 5000)
    }
  }
)

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <div class="login">
    <div class="login-vk">
      <Button class="vk-button" color="blue">
        <IconVK />
        Войти с помощью ВКонтакте
      </Button>
      <div class="description">
        Входя в систему через социальную сеть, я соглашаюсь привязать свой
        аккаунт в соответствии с Политикой конфиденциальности
      </div>
      <div class="line">
        <Line />
        или
        <Line />
      </div>
    </div>
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-inputs">
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
            yup.string().required('Заполнить обязательно').min(3, '3 минимум')
          "
        />
      </div>
      <div class="form-actions">
        <div class="form-actions-href" @click="onForgotPassword">
          Забыли пароль?
        </div>
        <div class="error-message" v-if="showError">
          Неверный пароль или email
        </div>
        <Button
          type="submit"
          class="form-actions-button"
          :disabled="loginMutation.isPending.value"
          >Войти
        </Button>
        <div class="form-actions-href" @click="onRegistration">
          <span>У вас еще нет учетной записи</span>
          Зарегистрируйтесь
        </div>
      </div>
    </form>
    <Button color="white-gray" @click="onCooperation"
      >Сотрудничество с тренерами
    </Button>
  </div>
</template>

<style scoped lang="scss">
@use 'LoginForm';
</style>
