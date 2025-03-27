<script setup lang="ts">
import {
  type GenericObject,
  type InvalidSubmissionContext,
  useForm
} from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'

import { useRecover } from '~/entities/user/api/query'
import type { FormScheme } from '~/widgets/Authentication/Components/ForgotPassForm/types'

const emits = defineEmits<FEmits>()

type FEmits = {
  (eventName: 'onForgotPassword'): void
  (eventName: 'onRegistration'): void
  (eventName: 'onSuccessCreate', email: string): void
  (eventName: 'onErrorCreate'): void
  (eventName: 'onCooperation'): void
}

const onRegistration = () => emits('onRegistration')
const onCooperation = () => emits('onCooperation')
const onForgotPassword = () => emits('onForgotPassword')

const model = ref<FormScheme>({
  email: ''
})

const { handleSubmit } = useForm({
  initialValues: model.value
})

const { mutate: recoverPassword, isPending, isError, isSuccess } = useRecover()

const onSubmitSuccess = async (values: GenericObject) => {
  recoverPassword(values.email, {
    onSuccess: () => {
      emits('onSuccessCreate', values.email)
    },
    onError: () => {
      emits('onErrorCreate')
    }
  })
}

const onSubmitError = (ctx: InvalidSubmissionContext) => {
  console.error('Ошибка валидации:', ctx)
}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <div class="forgot">
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-text">
        Мы отправим вам инструкции по его восстановлению по электронной почте
      </div>
      <div class="form-inputs">
        <Input
          v-model="model.email"
          name="email"
          placeholder="E-mail"
          :validator="
            yup
              .string()
              .required('Заполнить обязательно')
              .email('Email некорректный')
              .min(3, '3 минимум')
          "
        />
      </div>
      <div class="form-actions">
        <Button class="submit-button" :disabled="isPending">
          {{ isPending ? 'Отправка...' : 'Восстановить' }}
        </Button>
      </div>
      <p v-if="isError" class="error-message">
        Пользователя с данным e-mail не существует
      </p>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use 'ForgotPassForm';
</style>
