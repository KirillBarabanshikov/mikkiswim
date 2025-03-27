<script setup lang="ts">
import {
  type GenericObject,
  type InvalidSubmissionContext,
  useForm
} from 'vee-validate'
import { defineEmits } from 'vue'
import * as yup from 'yup'

import { useCheckCertificate } from '~/entities/certificate/api/query'
import type { FormScheme } from '~/features/ProfileForms/ActivateCertficateForm/types'
import { useUserStore } from '~/share/store/userStore'

const emit = defineEmits<{ (e: 'success', price: number): void }>()

const model = ref<FormScheme>({
  promoCode: ''
})

const { handleSubmit, values, resetForm } = useForm({
  initialValues: model.value
})

const userStore = useUserStore()
const config = useRuntimeConfig()
const apiUrl = config.public.API

const {
  data: certicifate,
  mutate,
  isPending,
  isError,
  isSuccess
} = useCheckCertificate()

const showMessage = ref(false)

const hideMessageAfterDelay = () => {
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 3000)
}

const onSubmitSuccess = (values: { promoCode: string }) => {
  console.log(values)

  mutate(values.promoCode, {
    onSuccess: async (data) => {
      resetForm()
      await userStore.fetchUser(apiUrl)
      emit('success', data.price)
      hideMessageAfterDelay()
    },
    onError: (err: any) => {
      console.error('Ошибка при активации сертификата:', err)
      hideMessageAfterDelay()
    }
  })
}

const onSubmitError = (ctx: InvalidSubmissionContext) => {
  console.error('Validation errors:', ctx.errors)
}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <div class="cabinet">
    <div class="cabinet-certificates">
      <div class="cabinet-certificates-title">
        Введите код активации <br />
        сертификата
      </div>
      <form class="form" @submit.prevent="onSubmit">
        <div class="form-item">
          <Input
            v-model="model.promoCode"
            placeholder="Код активации"
            name="promoCode"
            :type="isPending ? 'loading' : ''"
            :validator="
              yup.string().required('Заполнить обязательно').min(3, '3 минимум')
            "
          />
        </div>
        <div class="button">
          <Button type="submit" :disabled="isPending">Активировать</Button>
        </div>
      </form>
      <Transition name="fade">
        <div v-if="showMessage && isSuccess" class="success-block">
          Сертификат успешно активирован!
          <p>
            <span>+ {{ certicifate?.price }}</span> Микки монет
          </p>
        </div>
        <div v-else-if="showMessage && isError" class="error-block">
          Такого сертификата не существует
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.cabinet {
  margin: 0 auto;

  &-certificates {
    width: 262px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 24px;

    &-title {
      font-weight: 700;
      line-height: 155%;
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .btn {
      width: 100%;
    }

    .success-block {
      display: flex;
      flex-direction: column;
      gap: 24px;
      color: var(--green);
      font-size: 14px;

      p {
        font-weight: 700;
        font-size: 16px;
        color: var(--black);

        span {
          color: var(--green);
        }
      }
    }

    .error-block {
      font-size: 14px;
      color: var(--red);
    }
  }
}

@media (max-width: $md3 + 'px') {
  .cabinet {
    &-certificates {
      &-title {
        font-weight: 400;
      }
    }
  }
}
</style>
