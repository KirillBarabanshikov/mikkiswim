<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import * as yup from 'yup'

import { useAddressSuggest } from '~/entities/address/api/query'
import type { Address } from '~/entities/address/model/Address'
import { DeviceSize, useSizeWindow } from '~/share/utils/useSizeWindow'

const emit = defineEmits(['next', 'update:selectedAddress', 'submit'])
const { deviceSize } = useSizeWindow()

const validationSchema = yup.object({
  name: yup.string().required('Заполнить обязательно'),
  surname: yup.string().required('Заполнить обязательно'),
  email: yup
    .string()
    .email('Некорректный email')
    .required('Заполнить обязательно'),
  phone: yup
    .string()
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Некорректный номер телефона')
    .required('Заполнить обязательно'),
  address: yup.string().required('Заполнить обязательно')
})

const { handleSubmit, validate } = useForm({ validationSchema })

const name = useField('name')
const surname = useField('surname')
const email = useField('email')
const phone = useField('phone')
const address = useField('address')

const addressQuery = ref('')
const showSuggestions = ref(false)
const selectedAddress = ref<Address | null>(null)

const { data: addressSuggest } = useAddressSuggest(addressQuery)

const props = defineProps({
  steps: {
    type: Array as () => Array<{ step: string; title: string }>,
    required: true
  },
  currentStep: {
    type: Object as () => { step: string; title: string },
    required: true
  }
})

const highlightMatch = (address: string) => {
  if (!addressQuery.value) return address
  const words = addressQuery.value.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return address
  const regex = new RegExp(`(${words.join('|')})`, 'gi')
  return address.replace(regex, '<span class="highlight">$1</span>')
}

const selectAddress = (addressData: Address) => {
  selectedAddress.value = addressData
  addressQuery.value = addressData.value
  address.value.value = addressData.value // Синхронизируем с валидируемым полем
  showSuggestions.value = false
  emit('update:selectedAddress', addressData)
}

const onSubmit = handleSubmit((values) => {
  emit('submit', {
    ...values,
    address: selectedAddress.value
      ? selectedAddress.value.value
      : values.address
  })
  emit('next')
})

const validateAndSubmit = async () => {
  const { valid } = await validate()
  if (valid) {
    const values = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      phone: phone.value,
      address: selectedAddress.value
        ? selectedAddress.value.value
        : address.value
    }
    console.log('Validated contact form values:', values)
    emit('submit', values)
  }
}

watch(addressQuery, (newQuery) => {
  showSuggestions.value = newQuery.length >= 3
  address.value.value = newQuery
})

defineExpose({ validateAndSubmit })
</script>

<template>
  <section
    :class="['contacts', { 'mobile-view': deviceSize <= DeviceSize.MOBILE }]"
  >
    <div v-if="deviceSize <= DeviceSize.MOBILE" class="form-header">
      Оформление заказа
      <div class="stepper">
        <div class="steps">
          <div
            v-for="step in steps"
            :key="step.step"
            class="steps-item"
            :class="{ active: currentStep.step === step.step }"
          >
            <span>{{ step.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <form class="contacts-form" @submit.prevent="onSubmit">
      <div class="form-title">Личные данные</div>
      <div class="form-inputs">
        <Input
          v-model="name.value"
          name="name"
          placeholder="Имя*"
          :error="name.errorMessage"
        />
        <Input
          v-model="surname.value"
          name="surname"
          placeholder="Фамилия*"
          :error="surname.errorMessage"
        />
        <Input
          v-model="email.value"
          name="email"
          placeholder="E-mail*"
          :error="email.errorMessage"
        />
        <Input
          v-model="phone.value"
          name="phone"
          placeholder="Телефон*"
          maska="+7 (###) ###-##-##"
          :error="phone.errorMessage"
        />
      </div>
      <div class="address-title">Адрес доставки</div>
      <div class="address-input">
        <input
          v-model="addressQuery"
          type="text"
          placeholder="Город, улица, дом, квартира/офис*"
          class="input-field"
          @focus="showSuggestions = addressQuery.length >= 3"
        />
      </div>
      <div v-if="showSuggestions" class="suggestions">
        <ul class="suggestions-list">
          <li
            class="suggestions-item"
            v-for="suggestion in addressSuggest"
            :key="suggestion.value"
            @click="selectAddress(suggestion)"
            v-html="highlightMatch(suggestion.value)"
          ></li>
        </ul>
      </div>
      <div class="form-text">* Обязательные к заполнению поля</div>
      <!--      <Button type="submit" variant="black" size="small" block-->
      <!--        >Продолжить</Button-->
      <!--      >-->
    </form>
  </section>
</template>

<style lang="scss">
@use '/app/assets/scss/variables' as *;

.contacts-form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 555px;

  .form-title {
    font-weight: 700;
    font-size: 14px;
    color: var(--gray);
    margin-bottom: 16px;
  }

  .form-inputs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .form-text {
    font-size: 14px;
    margin-top: 36px;
    color: gray;
  }

  .address-input {
    grid-column: span 2;
    border: 1px solid var(--gray-400);
    padding: 9px 16px;
    border-radius: 30px;
    min-height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    transition: border-color 0.3s linear;

    &:hover {
      border-color: var(--black);
    }

    .input-field {
      width: 100%;
      font-size: 14px;
      border-radius: 5px;
    }
  }

  .address-title {
    font-weight: 700;
    font-size: 14px;
    color: var(--gray);
    margin-top: 36px;
  }

  .suggestions {
    display: flex;
    width: 100%;
    border-radius: 8px;
    padding: 8px 4px;
    box-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.04),
      0 12px 12px 0 rgba(0, 0, 0, 0.04);

    &-list {
      width: 100%;
      list-style: none;
    }

    &-item {
      display: flex;
      flex-wrap: wrap;
      padding: 12px;
      border-radius: 16px;
      cursor: pointer;
      gap: 6px;
      color: var(--black);

      &:hover {
        background-color: var(--gray-300);
      }
    }

    .highlight {
      color: var(--green);
    }
  }
}

.form-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 700;
  font-size: 19px;
  line-height: 150%;
  text-align: center;
}

.stepper {
  display: flex;
  justify-content: center;
  margin: 24px;
}

.steps {
  display: flex;
  align-items: center;
  gap: 8px;

  &-item {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 14px;
    color: var(--gray-400);

    &.active {
      color: var(--black);
    }
  }
}

.arrow-icon {
  margin-left: 4px;
  color: var(--gray-400);
  width: 16px;
}

@media (max-width: #{$md2 + px}) {
  .contacts-form {
    padding: 16px;

    .form-inputs {
      grid-template-columns: repeat(1, 1fr);
      gap: 16px;
    }
  }
}

@media (max-width: #{$md3 + px}) {
  .contacts-form {
    width: 100vw;
    padding: 16px;

    .form-inputs {
      grid-template-columns: repeat(1, 1fr);
      gap: 16px;
    }
  }
}
</style>
