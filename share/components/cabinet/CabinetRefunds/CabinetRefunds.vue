<script setup lang="ts">
import { ref } from 'vue'

import { useRefunds } from '~/entities/refund/api/query'
import RefundForm from '~/features/RefundForm/RefundForm.vue'
import RefundInfo from '~/features/RefundInfo/RefundInfo.vue'
import RefundList from '~/features/RefundList/RefundList.vue'
import RefundToggle from '~/features/RefundToggle/RefundToggle.vue'

const showRefundForm = ref(false)

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

const openRefundForm = () => {
  showRefundForm.value = true
}

const closeRefundForm = () => {
  showRefundForm.value = false
}

const toggleView = (view: 'cards' | 'info') => {
  activeView.value = view
}

const isShowSuccessCard = ref(false)

const toggleShowSuccessCard = () => {
  isShowSuccessCard.value = !isShowSuccessCard.value
}

const handleRefundSuccess = () => {
  showRefundForm.value = false
  activeView.value = 'cards'
  toggleShowSuccessCard()
}

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)

const { data: refunds, isPending } = useRefunds()
</script>

<template>
  <div v-if="showRefundForm" class="refund">
    <RefundForm
      @close="closeRefundForm"
      @refund-success="handleRefundSuccess"
    />
  </div>

  <div v-else-if="isPending">
    <div v-if="!isMobile" class="skeleton-list">
      <template v-for="n in 2" :key="n">
        <Skeleton height="150px" width="500px" />
      </template>
    </div>
    <div v-else class="skeleton-list">
      <template v-for="n in 2" :key="n">
        <Skeleton height="130px" width="360px" />
      </template>
    </div>
  </div>

  <div v-else-if="refunds && refunds.length > 0" class="refund">
    <RefundToggle :active-view="activeView" @toggle="toggleView" />

    <transition name="slide" mode="out-in">
      <div v-if="isShowSuccessCard" class="success-card">
        <div class="success-card-header">
          <p>
            <IconSuccess />
            Заявка на возврат оформлена!
          </p>
          <IconClose @click="toggleShowSuccessCard" class="icon-close" />
        </div>
        <div class="text">
          Наш менеджер свяжется с вами в ближайшее время для уточнения деталей
        </div>
      </div>
    </transition>

    <div class="content-wrapper">
      <transition name="slide" mode="out-in">
        <component
          :is="activeView === 'info' ? RefundInfo : RefundList"
          :refunds="refunds"
          @open-form="openRefundForm"
          :key="activeView"
        />
      </transition>
    </div>
  </div>

  <div v-else class="refund">
    <RefundInfo :refunds="[]" @open-form="openRefundForm" />
  </div>
</template>

<style scoped lang="scss">
@use 'CabinetRefunds';
</style>
