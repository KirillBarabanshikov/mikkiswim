<script setup lang="ts">
import { type InvalidSubmissionContext, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as yup from 'yup'

import { useUpdatePersonalInformation } from '~/entities/user/api/query'
import { useUserStore } from '~/share/store/userStore'

const userStore = useUserStore()

interface FormScheme {
  name: string
  surname: string
  email: string
  phone: string
  postcode: string
  city: string
  houseNumber: string
  region: string
  street: string
  apartment: string
}

const props = defineProps<{ initialData?: Partial<FormScheme> }>()

const originalEmail = ref(props.initialData?.email ?? '')

const validationSchema = yup.object({
  name: yup.string().min(2, 'Минимум 2 символа'),
  surname: yup
    .string()
    .required('Заполнить обязательно')
    .min(2, 'Минимум 2 символа'),
  email: yup
    .string()
    .required('Заполнить обязательно')
    .email('Неверный формат email'),
  phone: yup.string().required('Заполнить обязательно'),
  postcode: yup
    .string()
    .required('Заполнить обязательно')
    .matches(/^\d{6}$/, 'Должно содержать 6 цифр'),
  city: yup
    .string()
    .required('Заполнить обязательно')
    .min(2, 'Минимум 2 символа'),
  houseNumber: yup.string().required('Заполнить обязательно'),
  region: yup.string().required('Заполнить обязательно'),
  street: yup.string().required('Заполнить обязательно'),
  apartment: yup.string()
})

const { handleSubmit, resetForm, values } = useForm<FormScheme>({
  validationSchema,
  initialValues: {
    name: props.initialData?.name ?? '',
    surname: props.initialData?.surname ?? '',
    email: props.initialData?.email ?? '',
    phone: props.initialData?.phone ?? '',
    postcode: props.initialData?.postcode ?? '',
    city: props.initialData?.city ?? '',
    houseNumber: props.initialData?.houseNumber ?? '',
    region: props.initialData?.region ?? '',
    street: props.initialData?.street ?? '',
    apartment: props.initialData?.apartment ?? ''
  }
})

const emit = defineEmits(['close'])

const { mutate, isPending, isError, error } = useUpdatePersonalInformation()

const onSubmitSuccess = (formValues: FormScheme) => {
  const emailChanged = formValues.email !== originalEmail.value

  if (emailChanged) {
    userStore.updateEmail(formValues.email)
  }

  const dataToSend: Partial<FormScheme> = emailChanged
    ? { ...formValues }
    : (({ email, ...rest }) => rest)(formValues)

  mutate(dataToSend, {
    onSuccess: () => {
      originalEmail.value = formValues.email
      resetForm({ values: formValues })
      emit('close')
    },
    onError: (err: any) => {
      console.error('Ошибка при обновлении данных пользователя:', err)
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
      <div class="form-label">Личные данные</div>
      <div class="form-item">
        <Input name="name" type="text" placeholder="Имя*" />
        <Input name="email" type="email" placeholder="E-mail*" />
        <Input name="surname" type="text" placeholder="Фамилия*" />
        <Input
          name="phone"
          type="text"
          placeholder="Телефон*"
          maska="+7(###)-###-##-##"
        />
      </div>
      <div class="form-label">Адрес доставки</div>
      <div class="form-item">
        <Input
          name="postcode"
          type="text"
          placeholder="Почтовый индекс*"
          maska="######"
        />
        <Input name="region" type="text" placeholder="Область*" />
        <Input name="city" type="text" placeholder="Город*" />
        <Input name="street" type="text" placeholder="Улица*" />
        <Input name="houseNumber" type="text" placeholder="Дом*" />
        <Input name="apartment" type="text" placeholder="Квартира" />
      </div>
    </div>
    <div v-if="error" class="warning">
      Произошла ошибка при сохранении данных. Попробуйте позже.
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
.form {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &-label {
    font-weight: 700;
    font-size: 14px;
    color: var(--gray);
  }

  &-item {
    display: grid;
    grid-template-columns: repeat(2, auto);
    row-gap: 20px;
    column-gap: 32px;
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

.warning {
  font-size: 12px;
  line-height: 155%;
  color: var(--red);
}
</style>
