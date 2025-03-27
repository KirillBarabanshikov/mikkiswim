<script setup lang="ts">
import { type InvalidSubmissionContext, useForm } from 'vee-validate'
import * as yup from 'yup'

import { useAddVacancy } from '~/entities/vacancy/api/query'
import DragAndDropFileInput from '~/share/UI/DragAndDropInput/DranAndDropInput.vue'

const isModalOpen = ref(true)
const isSuccessPopupOpen = ref(false)

const props = defineProps<{ vacancyId: number | null }>()

interface FormScheme {
  vacancyId: number
  resumeDataFile: File | null
  surname: string
  name: string
  email: string
  phone: string
  resumeLink: string
  checkbox: boolean
}

const model = ref<FormScheme>({
  vacancyId: props.vacancyId || 0,
  resumeDataFile: null,
  surname: '',
  name: '',
  email: '',
  phone: '',
  resumeLink: '',
  checkbox: false
})

const {
  mutate: addVacancyApplication,
  isPending,
  isError,
  error
} = useAddVacancy()

const validationSchema = yup.object({
  surname: yup.string().required('Заполните фамилию'),
  name: yup.string().required('Заполните имя'),
  email: yup
    .string()
    .email('Неверный формат email')
    .required('Заполните email'),
  phone: yup.string().required('Заполните телефон'),
  resumeLink: yup.string().required('Заполните ссылку'),
  checkbox: yup.boolean().oneOf([true], 'Обязательно'),
  resumeDataFile: yup
    .mixed()
    .nullable()
    .test('fileRequired', 'Выберите файл', (value) => value instanceof File)
})

const { handleSubmit, resetForm, submitCount, values, setFieldValue } = useForm(
  {
    validationSchema,
    initialValues: {
      vacancyId: 0,
      resumeDataFile: null,
      surname: '',
      name: '',
      email: '',
      phone: '',
      resumeLink: '',
      checkbox: false
    }
  }
)

watch(
  () => props.vacancyId,
  (newVal) => {
    if (newVal) {
      model.value.vacancyId = newVal
    }
  }
)

watch(
  () => props.vacancyId,
  (newVal) => {
    if (newVal) {
      isModalOpen.value = true
    }
  }
)

const onSubmitSuccess = (values: FormScheme) => {
  const formData = new FormData()

  formData.append('vacancyId', model.value.vacancyId.toString())
  formData.append('resumeDataFile', values.resumeDataFile as unknown as Blob)
  formData.append('surname', values.surname)
  formData.append('name', values.name)
  formData.append('email', values.email)
  formData.append('phone', values.phone)
  formData.append('resumeLink', values.resumeLink)

  addVacancyApplication(formData, {
    onSuccess: (data) => {
      console.log('Форма отправлена успешно:', data)
      isModalOpen.value = false
      isSuccessPopupOpen.value = true
      resetForm()
    },
    onError: (error) => {
      console.error('Ошибка отправки формы:', error)
    }
  })
}

const onSubmitError = (ctx: InvalidSubmissionContext) => {
  console.error('Validation errors:', ctx.errors)
}

const router = useRouter()

const toMain = () => {
  isSuccessPopupOpen.value = false
  router.push('/')
}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <modal v-model:is-open="isModalOpen">
    <template #content>
      <div class="form">
        <div class="subtitle">Отклик на вакансию</div>
        <form class="form-wrapper" @submit.prevent="onSubmit">
          <Input v-model="model.surname" name="surname" placeholder="Фамилия" />
          <Input v-model="model.name" name="name" placeholder="Имя" />
          <Input v-model="model.email" name="email" placeholder="E-mail" />
          <Input
            v-model="model.phone"
            name="phone"
            placeholder="Телефон"
            maska="+7(###)-###-##-##"
          />
          <div class="custom-row">
            <div class="small-width">
              <Input
                v-model="model.resumeLink"
                name="resumeLink"
                placeholder="Ссылка на резюме"
              />
            </div>
            <div class="large-width">
              <DragAndDropFileInput
                :model-value="values.resumeDataFile"
                @update:model-value="
                  (file) => setFieldValue('resumeDataFile', file)
                "
                placeholder="Выберите файл или перетащите в поле DOC, PDF до 5 Мбайт"
                accept=".pdf,.doc,.docx"
              />
              <ErrorMessage name="resumeDataFile" v-slot="{ message }">
                <div v-if="submitCount > 0" class="error">{{ message }}</div>
              </ErrorMessage>
            </div>
          </div>
          <div class="full-width">
            <Checkbox
              v-model="model.checkbox"
              name="checkbox"
              type="checkbox"
              :validator="yup.boolean().oneOf([true], 'Обязательно')"
            />
            <p>Даю согласие на обработку <span>персональных данных</span></p>
          </div>
          <div class="form-action">
            <Button
              type="submit"
              variant="black"
              class="btn-submit"
              :disabled="isPending"
            >
              {{ isPending ? 'Отправка...' : 'Отправить' }}
            </Button>
          </div>
        </form>
      </div>
    </template>
  </modal>
  <modal v-model:is-open="isSuccessPopupOpen">
    <template #content>
      <div class="popup">
        <div class="popup-title">Заявка отправлена</div>
        <div class="popup-message">
          Спасибо за отклик на вакансию! <br />
          Если ваша кандидатура нам походит, мы вам позвоним.
        </div>
        <div class="popup-action">
          <Button @click="toMain">На главную</Button>
        </div>
      </div>
    </template>
  </modal>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.form {
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;

  &-action {
    margin: 0 auto;
    grid-column: 1 / -1;

    button {
      min-width: 200px;
    }
  }

  .subtitle {
    font-weight: 700;
    font-size: 20px;
    line-height: 155%;
    align-self: flex-start;
  }

  &-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 32px;
    row-gap: 24px;

    .custom-row {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: 40% 54%;
      gap: 32px;
    }

    .full-width {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      grid-column: 1 / -1;

      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 155%;

        span {
          border-bottom: 1px solid black;
          cursor: pointer;
        }
      }
    }
  }
}

.popup {
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 36px;

  .popup-title {
    font-weight: 700;
    font-size: 20px;
    line-height: 155%;
  }

  .popup-message {
    font-size: 14px;
    line-height: 155%;
    text-align: center;
  }

  .popup-action {
    display: flex;
    justify-content: center;
  }
}

.error {
  font-size: 14px;
  color: var(--red);
  margin: 8px 0 0 4px;
}

@media (max-width: #{$md3 + px}) {
  .form {
    &-wrapper {
      display: flex;
      flex-direction: column;
      row-gap: 16px;

      .custom-row {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
      }
    }

    &-action {
      margin-top: 36px;

      button {
        width: 100%;
      }
    }
  }
}
</style>
