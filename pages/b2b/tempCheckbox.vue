<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean // Для v-model
  name: string
  id?: string
  label?: string
  checkColor?: string
  borderColor?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="checkbox">
    <button
      @click="isChecked = !isChecked"
      :id="id"
      type="button"
      :class="['checkbox-field', { checked: isChecked }]"
      :style="{ borderColor: borderColor }"
    >
      <span v-if="isChecked" class="icon-check" :style="{ color: checkColor }">
        <IconCheck />
      </span>
    </button>
    <label v-if="label" :for="id" class="checkbox-label">
      {{ label }}
    </label>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.checkbox {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;

  &-field {
    width: 24px;
    height: 24px;
    border: 1px solid var(--gray);
    flex: 0 0 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray);

    &.checked {
      border-color: var(--black);
    }

    svg {
      width: 14px;
    }
  }

  &-label {
    font-size: 14px;
  }
}

@media (max-width: $md2 + px) {
  .checkbox {
    &-label {
      font-size: 12px;
    }
  }
}
</style>
