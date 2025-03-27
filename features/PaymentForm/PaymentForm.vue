<script setup lang="ts">
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
</script>

<template>
  <div class="paymant">
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
</template>

<style scoped lang="scss"></style>
