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
import { useGlobalStore } from '~/share/store/globalStore'
import type { FormScheme } from '~/widgets/Authentication/Components/LoginForm/types'

const emits = defineEmits<FEmits>()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
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
const onForgotPassword = () => emits('onForgotPassword')

const model = ref<FormScheme>({
  username: '',
  password: ''
})
const { handleSubmit } = useForm({
  initialValues: model.value
})

const toB2BRegister = () => {
  navigateTo('b2b-register')
  globalStore.toggleIsOpenAuthentication(false)
}

const toBackToMain = () => {
  navigateTo('/')
  globalStore.toggleIsOpenAuthentication(false)
}

const onSubmitSuccess = (values: GenericObject) => {
  console.log(values)
  loginUser()
}

const showErrorMessage = ref('')
const showError = ref(false)

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
      onError: (error: any) => {
        if (error.response?.status === 400) {
          showErrorMessage.value = 'Дождитесь подтверждения'
        } else {
          showErrorMessage.value = 'Неверный пароль или email'
        }
        showError.value = true
        setTimeout(() => {
          showError.value = false
        }, 5000)
      }
    }
  )
}

watch([() => model.value.username, () => model.value.password], () => {
  showError.value = false
})
const onSubmitError = (ctx: InvalidSubmissionContext) => {
  console.error('Validation errors:', ctx.errors)
}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <div class="login">
    <div class="logo">
      <img src="/img/B2B_page/b2b-logo.svg" alt="" />
    </div>
    <div class="subtitle">Чтобы продолжить, войдите в свою учетную запись</div>
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
      <div class="error-message" v-if="showError">
        {{ showErrorMessage }}
      </div>
      <div class="form-actions">
        <div class="form-actions-href" @click="onForgotPassword">
          Забыли пароль?
        </div>
        <Button
          type="submit"
          class="form-actions-button"
          :disabled="loginMutation.isPending.value"
          >Войти
        </Button>
        <Button type="button" color="white-gray" @click="toBackToMain">
          Назад
        </Button>
        <div class="form-actions-href" @click="toB2BRegister">
          <span>У вас еще нет учетной записи?</span>
          Зарегистрируйтесь
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use 'B2BLoginForm';
</style>
