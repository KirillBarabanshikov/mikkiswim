<script setup lang="ts">
import { useGlobalStore } from '~/share/store/globalStore'

defineProps({
  email: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['reset'])

const backToMain = () => {
  globalStore.toggleIsOpenAuthentication(false)
  emits('reset')
}

const globalStore = useGlobalStore()
</script>

<template>
  <div class="success">
    <IconSuccess />
    <div class="success-content">
      <div class="subtitle">Проверьте электронную почту</div>
      <p>
        Мы отправили сообщение с инструкциями по восстановлению пароля на адрес
        <br />
        {{ email }}
      </p>
      <p>
        Если вы не можете найти это сообщение, то, возможно, ваш адрес
        электронной почты не зарегистрирован или письмо попало в папку
        нежелательной почты.
      </p>
      <Button @click="backToMain">Вернуться на главную </Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'SuccessSendBlock';
</style>
