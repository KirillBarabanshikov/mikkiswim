<script setup lang="ts">
import { useField } from 'vee-validate'
import { useId } from 'vue'

interface Props {
  name: string
  id?: string
  placeholder?: string
  validator?: any
  label?: string
  rows?: number
  defaultValue?: string
}

const {
  name,
  id = useId(),
  validator = undefined,
  label = null,
  placeholder = '',
  rows = 3,
  defaultValue = ''
} = defineProps<Props>()

const { value, errors, handleChange } = useField(name, validator)
</script>

<template>
  <div class="textarea">
    <label v-if="label" :for="id" class="textarea-label">
      {{ label }}
    </label>

    <textarea
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      v-model="value"
      @input="handleChange"
      class="textarea-field"
      :class="{ error: errors.length }"
    ></textarea>

    <span v-if="errors.length" class="textarea-error">
      {{ errors[0] }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.textarea {
  position: relative;
  border-radius: 16px;
  font-size: 14px;

  &-field {
    position: relative;
    width: 100%;
    min-height: 60px;
    resize: none;
    background: #fff;
    border: 1px solid var(--gray-400);
    border-radius: 10px;
    padding: 12px;

    &.error {
      border-color: var(--red);
      color: var(--red);
    }
  }

  &-label {
  }

  &-error {
    font-size: 14px;
    color: var(--red);
    margin: 8px 0 0 4px;
  }
}
</style>
