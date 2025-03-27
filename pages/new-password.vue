<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as yup from 'yup'

import {
  useCheckRecoveryLink,
  useResetPassword
} from '~/entities/user/api/query'
import { useGlobalStore } from '~/share/store/globalStore'

const route = useRoute()
const router = useRouter()
const globalStore = useGlobalStore()

const token = (route.query.token as string) || ''
const email = (route.query.email as string) || ''

const {
  data: isValid,
  isLoading: isChecking,
  error: checkError
} = useCheckRecoveryLink(token, email)

const {
  mutate: resetPassword,
  isPending: isResetting,
  isError: resetError,
  error: resetErrorMessage
} = useResetPassword()

const success = ref(false)
const errorMessage = ref('')
const errorTimer = ref<number | null>(null)

const setErrorHideTimer = () => {
  if (errorTimer.value !== null) {
    clearTimeout(errorTimer.value)
  }

  errorTimer.value = window.setTimeout(() => {
    errorMessage.value = ''
    errorTimer.value = null
  }, 7000)
}

watch(errorMessage, (newValue) => {
  if (newValue) {
    setErrorHideTimer()
  }
})

const noRepeatedChars = (value: string) => !/(.)\1{3}/.test(value)

const validationSchema = yup.object({
  password: yup
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
    ),
  confirmPassword: yup
    .string()
    .required('Заполнить обязательно')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
})

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    password: '',
    confirmPassword: ''
  }
})

const onSubmitSuccess = async (values: any) => {
  resetPassword(
    { token, email, password: values.password },
    {
      onSuccess: () => {
        success.value = true
        setTimeout(() => {
          router.push('/')
          globalStore.toggleIsOpenAuthentication(true)
        }, 2000)
      },
      onError: (err: any) => {
        if (err.response && err.response.status === 422) {
          errorMessage.value = 'Пароль слишком простой'
        } else if (err.response && err.response.status === 400) {
          errorMessage.value =
            'Новый пароль уже использовался ранее, необходимо указать пароль, который вы не использовали ранее.'
        } else {
          errorMessage.value =
            err.message || 'Произошла ошибка при сбросе пароля'
        }
      }
    }
  )
}

const onSubmitError = (ctx: any) => {
  console.error('Validation errors:', ctx.errors)
}

const { width } = useWindowSize()

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <div class="new-password">
    <div class="logo">
      <IconLogo />
    </div>
    <div v-if="isChecking">
      <Loader />
    </div>

    <template v-else>
      <div v-if="checkError" class="error-message">
        Ссылка для сброса пароля недействительна или устарела
        <Button @click="router.push('/')">На главную</Button>
      </div>

      <div v-else class="form-container">
        <div class="form-wrapper">
          <form class="form" @submit.prevent="onSubmit">
            <div class="subtitle">Введите новый пароль</div>

            <p>
              Не менее 8 символов, в том числе строчная буква, заглавная буква и
              цифра. Не повторяйте один и тот же символ более 3 раз.
            </p>
            <div class="form-inputs">
              <Input
                name="password"
                type="password"
                placeholder="Введите новый пароль"
              />
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Повторите пароль"
              />
            </div>

            <Button type="submit" :disabled="isResetting">
              {{ isResetting ? 'Сброс..' : 'Сбросить пароль' }}
            </Button>

            <div v-if="width < 768" class="message-block">
              <span v-if="success" class="success-message">
                Пароль успешно изменён!
              </span>
              <span v-else-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </span>
            </div>
          </form>

          <Transition name="slide" mode="out-in">
            <div
              v-if="width >= 768 && (success || errorMessage)"
              class="message-block"
              :class="{
                'success-block': success,
                'error-block': errorMessage && !success
              }"
            >
              <div v-if="success" class="message-title">
                <IconSuccess class="success-icon" />
                <p>Успешно</p>
              </div>
              <div v-else-if="errorMessage" class="message-title">
                <IconWarning />
                <p>Внимание</p>
              </div>
              <div class="message-text">
                {{ success ? 'Пароль успешно изменён!' : errorMessage }}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.new-password {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 36px;
  margin: 96px auto;
}

.form-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form-wrapper {
  position: relative;
  width: 262px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;

  &-inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

.message-block {
  &.error-block {
    position: absolute;
    left: calc(100% + 32px);
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 13px;
    min-width: 261px;
    border-radius: 16px;
    padding: 16px;
    box-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.04),
      0 12px 12px 0 rgba(0, 0, 0, 0.04);
    background: var(--white);

    .message-title {
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        color: var(--red);
        width: 24px;
        height: 24px;
      }

      p {
        font-weight: 700;
        font-size: 14px;
        line-height: 155%;
      }
    }

    .message-text {
      font-size: 11px;
      line-height: 155%;
    }
  }

  &.success-block {
    position: absolute;
    left: calc(100% + 32px);
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 13px;
    min-width: 261px;
    border-radius: 16px;
    padding: 16px;
    box-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.04),
      0 12px 12px 0 rgba(0, 0, 0, 0.04);
    background: var(--white);

    .message-title {
      display: flex;
      align-items: center;
      gap: 10px;

      .success-icon {
        color: var(--green);
        width: 24px;
        height: 24px;
      }

      p {
        font-weight: 700;
        font-size: 14px;
        line-height: 155%;
      }
    }

    .message-text {
      font-size: 11px;
      line-height: 155%;
    }
  }
}

.message-block {
  .success-message {
    color: var(--green);
    text-align: center;
    font-size: 14px;
    line-height: 155%;
  }

  .error-message {
    color: var(--red);
    text-align: center;
    font-size: 14px;
    line-height: 155%;
  }
}

svg {
  width: 138px;
  height: 30px;
}

p {
  text-align: center;
  font-weight: 300;
  font-size: 13px;
  line-height: 154%;
}

.subtitle {
  font-weight: 700;
  font-size: 16px;
  line-height: 155%;
  text-align: center;
}
</style>
