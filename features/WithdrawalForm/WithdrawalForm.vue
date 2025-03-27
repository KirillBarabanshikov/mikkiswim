<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import { type InvalidSubmissionContext, useForm } from 'vee-validate'
import { defineEmits } from 'vue'
import * as yup from 'yup'

import { useAddRefund } from '~/entities/refund/api/query'
import { useAddWithdrawal } from '~/entities/withdrawal/api/query'
import type { FormScheme } from '~/features/WithdrawalForm/types'
import { useUserStore } from '~/share/store/userStore'

const userStore = useUserStore()
const config = useRuntimeConfig()
const apiUrl = config.public.API

const {
  public: { API }
} = useRuntimeConfig()

const validationSchema = yup.object({
  bank: yup.string().min(2, 'Минимум 2 символа').required(),
  correspondentAccount: yup
    .string()
    .min(20, 'Минимум 20 cимволов')
    .max(20, 'Максимум 20 cимволов')
    .required(),
  recipient: yup
    .string()
    .min(20, 'Минимум 20 cимволов')
    .max(20, 'Максимум 20 cимволов')
    .required(),
  bik: yup
    .string()
    .min(9, 'Минимум 9 символов')
    .max(9, 'Максимум 9 символов')
    .required(),
  sum: yup
    .number()
    .typeError('Количество должно быть числом!')
    .required('Введите сумму')
    .min(1, 'Минимум 1')
    .test(
      'max-coins',
      function () {
        const maxAmount = userStore.user?.mikkiCoins ?? 0
        return `Максимальная сумма для вывода: ${maxAmount}`
      },
      function (value) {
        const maxAmount = userStore.user?.mikkiCoins ?? 0
        return value <= maxAmount
      }
    )
    .required()
})

const { handleSubmit, resetForm } = useForm<FormScheme>({
  validationSchema,
  initialValues: {
    bank: '',
    correspondentAccount: '',
    recipient: '',
    bik: '',
    sum: 0
  }
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'withdraw-success'): void
}>()

const { mutate, isPending, isError, error } = useAddWithdrawal()

const queryClient = useQueryClient()
const onSubmitSuccess = (values: FormScheme) => {
  const formattedValues: FormScheme = {
    ...values,
    sum: Number(values.sum)
  }
  console.log('Отправляемые данные:', formattedValues)
  mutate(formattedValues, {
    onSuccess: async () => {
      resetForm()
      await queryClient.invalidateQueries({ queryKey: ['withdrawal'] })
      await userStore.fetchUser(apiUrl)
      emit('withdraw-success')
    },
    onError: (err: any) => {
      console.error('Ошибка при добавлении заявки на вывод:', err)
    }
  })
}

const onSubmitError = (ctx: InvalidSubmissionContext) => {
  console.error('Ошибки валидации:', ctx.errors)
}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="form">
      <div class="form-header">
        <div class="subtitle">Заявка на вывод средств</div>
        <p>
          Вывод средств осуществляется поквартально. С 1 апреля по 30 апреля, с
          1 июля по 30 июля , с 1 октября по 30 октября , с 1 января по 30
          января.
        </p>
        <p>Срок Вывода средств до 7 рабочих дней</p>
      </div>
      <div class="form-content">
        <div class="form-item">
          <div class="form-label">Укажите сумму</div>
          <Input name="sum" placeholder="Сумма" />
        </div>
        <div class="form-item">
          <div class="form-label">
            Укажите данные банковской карты для вывода средств
          </div>
          <div class="form-grid">
            <Input name="bank" placeholder="Банк получателя*" />
            <Input name="correspondentAccount" placeholder="К/с*" />
            <Input name="recipient" placeholder="Счет получателя*" />
            <Input name="bik" placeholder="БИК" />
          </div>
        </div>
      </div>
      <div class="form-actions">
        <Button type="submit" :disabled="isPending">
          {{ isPending ? 'Отправка...' : 'Отправить' }}
        </Button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
@use 'WithdrawalForm';
</style>
