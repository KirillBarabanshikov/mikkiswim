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
import type { FormScheme } from '~/widgets/Authentication/Components/CoopLoginForm/types'

const router = useRouter()
const globalStore = useGlobalStore()
const authStore = useAuthStore()
const config = useRuntimeConfig()
const apiUrl = config.public.API
const loginMutation = useAuth(true, apiUrl)

type FEmits = {
  (eventName: 'onSuccessCreate'): void
  (eventName: 'onErrorCreate'): void
  (eventName: 'onForgotPassword'): void
}

const onForgotPassword = () => emits('onForgotPassword')
const emits = defineEmits<FEmits>()

const model = ref<FormScheme>({
  username: '',
  password: ''
})
const { handleSubmit, values } = useForm({
  initialValues: model.value
})

const onSubmitSuccess = (values: GenericObject) => {
  console.log(values)
  loginUser()
}

const loginUser = () => {
  loginMutation.mutate(
    {
      username: values.username,
      password: values.password
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

const toCoachRegister = () => {
  navigateTo('/partner-register')
  globalStore.toggleIsOpenAuthentication(false)
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
  <div class="coop">
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-inputs">
        <Input
          placeholder="Логин"
          name="username"
          :validator="
            yup.string().required('Заполнить обязательно').min(3, '3 минимум')
          "
        />
        <Input
          placeholder="Пароль"
          type="password"
          name="password"
          :validator="
            yup.string().required('Заполнить обязательно').min(3, '3 минимум')
          "
        />
      </div>
      <div class="form-href" @click="onForgotPassword">Забыли пароль?</div>
      <div class="error-message" v-if="showError">
        Неверный пароль или email
      </div>
      <Button
        type="submit"
        class="submit-button"
        :disabled="loginMutation.isPending.value"
        >Войти</Button
      >
    </form>
    <Button color="white-gray" @click="toCoachRegister">Регистрация</Button>
  </div>
</template>

<style scoped lang="scss">
@use 'CoopLoginForm';
</style>
