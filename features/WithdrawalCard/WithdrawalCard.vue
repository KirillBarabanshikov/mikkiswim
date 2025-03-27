<script setup lang="ts">
import { ref } from 'vue'

import type { Withdrawal } from '~/entities/withdrawal/model/Withdrawal'
import WithdrawalDetails from '~/features/WithdrawalCard/components/WithdrawalDetails/WithdrawalDetails.vue'
import WithdrawalHeader from '~/features/WithdrawalCard/components/WithdrawalHeader/WithdrawalHeader.vue'

const props = defineProps<{ withdrawal: Withdrawal }>()
const isExpanded = ref(false)

const {
  public: { API }
} = useRuntimeConfig()

const toggleDetails = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="card" :class="{ expanded: isExpanded }">
    <WithdrawalHeader
      :withdrawal="withdrawal"
      :is-expanded="isExpanded"
      :api="API"
      @toggle="toggleDetails"
    />

    <div class="content-wrapper">
      <WithdrawalDetails
        :class="{ active: isExpanded }"
        :withdrawal="withdrawal"
        :api="API"
        @toggle="toggleDetails"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'WithdrawalCard';
</style>
