<script setup lang="ts">
import { ref } from 'vue'

import { useWithdrawals } from '~/entities/withdrawal/api/query'
import WithdrawalForm from '~/features/WithdrawalForm/WithdrawalForm.vue'
import WithdrawalList from '~/features/WithdrawalList/WithdrawalList.vue'
import WithdrawalToggle from '~/features/WithdrawalToggle/WithdrawalToggle.vue'

const showWithdrawalForm = ref(false)

const props = defineProps({
  initialActiveView: {
    type: String as () => 'cards' | 'info',
    default: 'cards'
  }
})

const activeView = ref<'cards' | 'info'>(props.initialActiveView)

watch(
  () => props.initialActiveView,
  (newVal) => {
    activeView.value = newVal
  }
)

const openWithdrawalForm = () => {
  showWithdrawalForm.value = true
}

const toggleView = (view: 'cards' | 'info') => {
  activeView.value = view
}

const isShowSuccessCard = ref(false)

const toggleShowSuccessCard = () => {
  isShowSuccessCard.value = !isShowSuccessCard.value
}

const handleWithdrawSuccess = () => {
  console.log('Withdraw success')
  showWithdrawalForm.value = false
  activeView.value = 'cards'
  toggleShowSuccessCard()
}

const { data: withdrawal, isPending } = useWithdrawals()
</script>

<template>
  <div v-if="isPending" class="skeleton-list">
    <template v-for="n in 2" :key="n">
      <Skeleton height="150px" width="500px" />
    </template>
  </div>

  <div v-else-if="withdrawal && withdrawal.length > 0" class="withdrawal">
    <WithdrawalToggle :active-view="activeView" @toggle="toggleView" />

    <transition name="slide" mode="out-in">
      <div v-if="isShowSuccessCard" class="success-card">
        <div class="success-card-header">
          <p>
            <IconSuccess />
            Заявка на вывод средств оформлена!
          </p>
          <IconClose @click="toggleShowSuccessCard" class="icon-close" />
        </div>
        <div class="text">
          Срок вывода средств до 7 рабочих дней. При возникновении вопросов наш
          менеджер свяжется с вами.
        </div>
      </div>
    </transition>

    <div class="content-wrapper">
      <transition name="slide" mode="out-in">
        <component
          :is="activeView === 'info' ? WithdrawalForm : WithdrawalList"
          :withdrawal="withdrawal"
          @open-form="openWithdrawalForm"
          @withdraw-success="handleWithdrawSuccess"
          :key="activeView"
        />
      </transition>
    </div>
  </div>

  <div v-else class="withdrawal">
    <WithdrawalForm
      @open-form="openWithdrawalForm"
      @withdraw-success="handleWithdrawSuccess"
    />
  </div>
</template>
<style scoped lang="scss">
@use 'CabinetWithdrawal';
</style>
