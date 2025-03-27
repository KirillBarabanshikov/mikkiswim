<script setup lang="ts">
import { type InvalidSubmissionContext, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as yup from 'yup'

import { useChangeInfoB2B } from '~/entities/user-b2b/api/query'
import type { b2bData } from '~/entities/user-b2b/model/User-b2b'

const props = defineProps<{ initialData?: b2bData }>()

const validationSchema = yup.object({
  companyName: yup.string().min(3, 'Минимум 3 символа'),
  legalAddress: yup.string().min(3, 'Минимум 3 символа'),
  mailingAddress: yup.string().min(3, 'Минимум 3 символа'),
  bankName: yup.string().min(3, 'Минимум 3 символа'),
  bankAddress: yup.string().min(3, 'Минимум 3 символа'),
  paymentAccount: yup
    .string()
    .min(20, 'Минимум 20 cимволов')
    .max(20, 'Максимум 20 cимволов'),
  inn: yup
    .string()
    .test('inn-length', 'ИНН должен содержать 10 или 12 цифр', (value) =>
      value ? value.length === 10 || value.length === 12 : false
    ),
  correspondentAccount: yup
    .string()
    .min(20, 'Минимум 20 cимволов')
    .max(20, 'Максимум 20 cимволов'),
  ogrn: yup
    .string()
    .test('ogrn-length', 'ИНН должен содержать 13 или 15 цифр', (value) =>
      value ? value.length === 13 || value.length === 15 : false
    ),
  ceoName: yup.string().min(3, 'Минимум 3 символа'),
  companySite: yup.string().min(3, 'Минимум 3 символа'),
  companyPhone: yup.string().min(3, 'Минимум 3 символа'),
  companyEmail: yup.string().email('Неверный формат email')
})

const { handleSubmit, resetForm } = useForm<b2bData>({
  validationSchema,
  initialValues: {
    companyName: props.initialData?.companyName ?? '',
    legalAddress: props.initialData?.legalAddress ?? '',
    mailingAddress: props.initialData?.mailingAddress ?? '',
    bankName: props.initialData?.bankName ?? '',
    bankAddress: props.initialData?.bankAddress ?? '',
    paymentAccount: props.initialData?.paymentAccount ?? '',
    inn: props.initialData?.inn ?? '',
    correspondentAccount: props.initialData?.correspondentAccount ?? '',
    ogrn: props.initialData?.ogrn ?? '',
    ceoName: props.initialData?.ceoName ?? '',
    companySite: props.initialData?.companySite ?? '',
    companyPhone: props.initialData?.companyPhone ?? '',
    companyEmail: props.initialData?.companyEmail ?? ''
  }
})

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      resetForm({ values: newData })
    }
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['close'])

const { mutate, isPending, isError, error } = useChangeInfoB2B()

const onSubmitSuccess = (values: b2bData) => {
  mutate(values, {
    onSuccess: () => {
      resetForm()
      emit('close')
    },
    onError: (err: any) => {
      console.error('Ошибка при обновлении данных компании:', err)
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
      <div v-if="error" class="warning">
        Произошла ошибка при сохранении данных. Попробуйте позже.
      </div>
      <Button
        type="submit"
        variant="black"
        class="btn-submit"
        :disabled="isPending"
      >
        {{ isPending ? 'Сохранение...' : 'Сохранить' }}
      </Button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@use 'ChangeB2BInfoForm';
</style>
