<script setup lang="ts">
import { ref } from 'vue'

import type { Refund } from '~/entities/refund/model/Refund'
import RefundDetails from '~/features/RefundCard/components/RefundDetails/RefundDetails.vue'
import RefundHeader from '~/features/RefundCard/components/RefundHeader/RefundHeader.vue'

const props = defineProps<{ refund: Refund }>()
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
    <RefundHeader
      :refund="refund"
      :is-expanded="isExpanded"
      :api="API"
      @toggle="toggleDetails"
    />

    <div class="content-wrapper">
      <RefundDetails
        :class="{ active: isExpanded }"
        :refund="refund"
        :api="API"
        @toggle="toggleDetails"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'RefundCard';
</style>
