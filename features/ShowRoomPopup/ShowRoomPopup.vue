<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { useAddShowroom } from '~/entities/showroom/api/query'
import type { FormScheme, FormSchemeData } from '~/features/ShowRoomPopup/types'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const model = ref<FormScheme>({
  name: '',
  phone: '',
  dateAt: null,
  timeAt: ''
})

const isSuccess = ref<boolean>(false)

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Заполнить обязательно')
    .min(2, 'Минимум 2 символа'),
  phone: yup
    .string()
    .required('Заполнить обязательно')
    .min(17, 'Заполните полностью'),
  dateAt: yup.string().required('Заполнить обязательно'),
  timeAt: yup.string().min(5, 'Время обязательно').required('Время обязательно')
})

const { mutate: sendForm, isPending } = useAddShowroom()

const { handleSubmit, values, resetForm } = useForm({
  validationSchema,
  initialValues: model.value
})

const onSubmitSuccess = () => {
  const formattedModel: FormSchemeData = {
    name: values.name,
    phone: values.phone,
    dateAt: values.dateAt
      ? `${values.dateAt.year}-${String(values.dateAt.month).padStart(2, '0')}-${String(values.dateAt.day).padStart(2, '0')}T${values.dateAt || '00:00'}:00`
      : '0000-00-00T00:00:00',
    timeAt: values.timeAt
  }

  sendForm(formattedModel, {
    onSuccess: () => {
      isSuccess.value = true
      resetForm()
    }
  })
}
const onSubmitError = () => {}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="showroom">
    <form v-if="!isSuccess" @submit.prevent="onSubmit" class="form">
      <div class="title">Запись в шоурум</div>
      <p>Укажите свои контактные данные и желаемое время для посещения</p>
      <div class="form-content">
        <Input name="name" placeholder="Имя" />
        <Input name="phone" placeholder="Телефон" maska="+7(###)-###-##-##" />
        <DatePicker name="dateAt" />
        <Input name="timeAt" placeholder="Время" maska="##:##" />
      </div>
      <div class="form-actions">
        <Button type="submit">Отправить</Button>
      </div>
    </form>
    <div v-else class="showroom-success">
      <div class="title">Заявка отправлена</div>
      <p>Наш менеджер свяжется свами в ближайшее время для уточнения деталей</p>
      <Button @click="close">Ок</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.showroom {
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 36px;
    text-align: center;

    &-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &-actions {
      button {
        width: 154px;
      }
    }
  }

  &-success {
    display: flex;
    flex-direction: column;
    gap: 36px;
    text-align: center;
  }

  .title {
    color: var(--yellow);
  }

  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 155%;
  }
}
</style>
