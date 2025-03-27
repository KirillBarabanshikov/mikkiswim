<script setup lang="ts">
import 'animate.css'

import { useGlobalStore } from '~/share/store/globalStore'
import B2BLoginForm from '~/widgets/Authentication/Components/B2BLoginForm/B2BLoginForm.vue'
import CoopLoginForm from '~/widgets/Authentication/Components/CoopLoginForm/CoopLoginForm.vue'
import ForgotPassForm from '~/widgets/Authentication/Components/ForgotPassForm/ForgotPassForm.vue'
import LoginAfterRegForm from '~/widgets/Authentication/Components/LoginAfterRegForm/LoginAfterRegForm.vue'
import LoginForm from '~/widgets/Authentication/Components/LoginForm/LoginForm.vue'
import RegistrationForm from '~/widgets/Authentication/Components/RegistrationForm/RegistrationForm.vue'
import SuccessSendBlock from '~/widgets/Authentication/Components/SuccessSendBlock/SuccessSendBlock.vue'

const globalStore = useGlobalStore()
const route = useRoute()

const isSuccessSend = ref(false)
const email = ref('')
const previousStep = ref<STEP_TYPE>('authorizationDefault')
const isManualNavigation = ref(false)

const setIsSuccess = (receivedEmail: string) => {
  email.value = receivedEmail
  isSuccessSend.value = true
}

const resetSuccessState = () => {
  isSuccessSend.value = false
  email.value = ''
  setStep(previousStep.value)
}

type STEP_TYPE =
  | 'authorizationDefault'
  | 'registration'
  | 'forgotPassword'
  | 'authorizationAfterRegistration'
  | 'cooperation'
  | 'b2b'

type STEP = {
  step: STEP_TYPE
  title: string
}

const stepper = reactive<Record<STEP_TYPE, STEP>>({
  authorizationDefault: {
    step: 'authorizationDefault',
    title:
      'Чтобы продолжить, войдите в свою учетную запись или зарегистрируйтесь'
  },
  registration: {
    step: 'registration',
    title: 'Создать учетную запись'
  },
  forgotPassword: {
    step: 'forgotPassword',
    title: 'Забыл пароль'
  },
  authorizationAfterRegistration: {
    step: 'authorizationAfterRegistration',
    title: 'Вход в учетную запись'
  },
  cooperation: {
    step: 'cooperation',
    title: 'Вход в учетную запись'
  },
  b2b: {
    step: 'b2b',
    title: 'Чтобы продолжить, войдите в свою учетную запись'
  }
})

const currentStep = ref<STEP>(stepper.authorizationDefault)

const setStep = (stepType: STEP_TYPE) => {
  if (!isManualNavigation.value) {
    previousStep.value = currentStep.value.step
  }
  currentStep.value = stepper[stepType]
  isManualNavigation.value = true
}

const onBackStep = () => {
  if (previousStep.value === currentStep.value.step) {
    globalStore.toggleIsOpenAuthentication(false)
  } else {
    currentStep.value = stepper[previousStep.value]
  }
  isManualNavigation.value = false
}

watchEffect(() => {
  if (!globalStore.isOpenAuthentication) return

  if (route.name === 'partners') {
    currentStep.value = stepper.cooperation
    previousStep.value = 'authorizationDefault'
  } else if (route.name === 'b2b') {
    currentStep.value = stepper.b2b
    previousStep.value = 'b2b'
  } else {
    currentStep.value = stepper.authorizationDefault
    previousStep.value = 'authorizationDefault'
  }
})
const isMobile = ref(false)

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
    handleResize()
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<template>
  <Transition :name="isMobile ? undefined : 'menu-right'">
    <div v-if="globalStore.isOpenAuthentication" class="authentication">
      <div v-if="currentStep.step === 'cooperation'" class="logo">
        <img src="/img/cooperation.webp" alt="" />
      </div>
      <div
        v-if="!isSuccessSend && currentStep.step != 'b2b'"
        @click="onBackStep"
        class="stepper"
      >
        <IconArrowLeft class="stepper-arrow" />
        {{ currentStep.title }}
      </div>
      <RegistrationForm
        v-if="currentStep.step === 'registration'"
        @on-success-create="setStep('authorizationDefault')"
      />
      <LoginForm
        v-if="currentStep.step === 'authorizationDefault'"
        @on-registration="setStep('registration')"
        @on-forgot-password="setStep('forgotPassword')"
        @on-cooperation="setStep('cooperation')"
        @on-success-create="globalStore.toggleIsOpenAuthentication(false)"
      />
      <ForgotPassForm
        v-if="currentStep.step === 'forgotPassword' && !isSuccessSend"
        @on-success-create="setIsSuccess"
      />
      <CoopLoginForm
        v-if="currentStep.step === 'cooperation'"
        @on-forgot-password="setStep('forgotPassword')"
      />
      <LoginAfterRegForm
        v-if="currentStep.step === 'authorizationAfterRegistration'"
        @on-registration="setStep('registration')"
        @on-forgot-password="setStep('forgotPassword')"
        @on-cooperation="setStep('cooperation')"
      />
      <B2BLoginForm
        v-if="currentStep.step === 'b2b'"
        @on-forgot-password="setStep('forgotPassword')"
      />
      <SuccessSendBlock
        v-if="isSuccessSend"
        :email="email"
        @reset="resetSuccessState"
      />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use 'Authentication';
</style>
