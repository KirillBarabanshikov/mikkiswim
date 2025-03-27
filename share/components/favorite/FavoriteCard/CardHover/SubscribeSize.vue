<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const emits = defineEmits<{
  (eventName: 'onSubscribe', email: string): void
}>()

const schema = yup.object({
  email: yup
    .string()
    .required('Обязательно к заполнению')
    .email('Некорректный формат email')
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

const { value: email, errorMessage } = useField('email')

const onSubscribe = handleSubmit((values) => {
  emits('onSubscribe', values.email)
})
</script>

<template>
  <div class="describe">
    <p>
      Укажите почту и мы уведомим вас <br />
      о поступлении товара
    </p>
    <form @submit.prevent="onSubscribe">
      <div class="form-item">
        <Input v-model="email" placeholder="E-mail" name="email" />
        <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
      </div>

      <Button type="submit">Сообщить о поступлении</Button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;
@use '/app/assets/scss/animation';

.describe {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
  font-size: 12px;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.form-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.error {
  font-size: 12px;
  color: var(--red);
}

.btn-black {
  width: 100%;
  max-width: 232px;
  padding: 10px 15px;
  background-color: black;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: darkgray;
  }
}

@media (max-width: $md1 + px) {
  .describe {
    max-width: 220px;
  }
}

@media (max-width: $md2 + px) {
  .btn-black {
    max-width: 200px;
    font-size: 12px;
  }
}
</style>
