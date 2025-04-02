<script setup lang="ts">
import type { MaskInputOptions, MaskType } from 'maska'
import { useField } from 'vee-validate'
import { onMounted, reactive } from 'vue'
import type { AnyObject, AnySchema } from 'yup'

interface Props {
  label?: string | null
  name: string
  defaultValue?: string
  validator?: AnySchema<any | any[], AnyObject, undefined, ''> | undefined
  maska?: MaskType
  maskaNumbers?: {
    locale?: string
    fraction?: number
    unsigned?: boolean
  } | null
  disabled?: boolean
  placeholder?: string
  type?: string
}

const emit = defineEmits<{
  (e: 'focus'): void
  (e: 'clickSearch'): void
}>()

defineOptions({
  inheritAttrs: false
})

const {
  name,
  validator = undefined,
  label = null,
  maska = null,
  maskaNumbers = null,
  defaultValue = undefined,
  disabled = false,
  type = 'text'
} = defineProps<Props>()

const { value, errorMessage, validate, errors } = useField(
  () => name,
  validator,
  {
    validateOnValueUpdate: false,
    initialValue: defaultValue
  }
)

const isPasswordVisible = ref(false)

const onBlur = async () => {
  await validate()
}
const onFocus = () => {
  emit('focus')
}
const clickSearch = () => {
  emit('clickSearch')
}

const showPassword = () => {
  isPasswordVisible.value = true
}

const hidePassword = () => {
  isPasswordVisible.value = false
}

const maskOption = reactive<MaskInputOptions>({
  mask: maska,
  eager: true
})

onMounted(() => {
  if (maskaNumbers) {
    maskOption.number = maskaNumbers
  }
})

const inputType = computed(() => {
  if (type !== 'password') return type
  return isPasswordVisible.value ? 'text' : 'password'
})
</script>

<template>
  <div class="input">
    <div v-if="label" :class="['input-label', { error: errors.length }]">
      {{ label }}
    </div>

    <div class="input-field-wrapper">
      <input
        v-model="value"
        v-maska="maskOption"
        :class="['input-field', { error: errors.length }]"
        :name
        :disabled="disabled"
        :placeholder="placeholder"
        v-bind="$attrs"
        @blur="onBlur"
        @focus="onFocus"
        :type="inputType"
      />

      <div
        v-if="type === 'password'"
        class="input-icon password-toggle"
        @mousedown.prevent="showPassword"
        @mouseup="hidePassword"
        @mouseleave="hidePassword"
        @touchstart.prevent="showPassword"
        @touchend="hidePassword"
      >
        <IconEye2 v-if="isPasswordVisible" />
        <IconEyeClosed v-else />
      </div>

      <IconSearch
        v-if="type === 'search'"
        class="input-icon"
        @click="clickSearch"
      />
      <div v-if="type === 'loading'" class="input-icon">
        <IconLoading class="loading" />
      </div>
    </div>

    <div v-if="errorMessage" class="input-error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.input {
  display: flex;
  flex-direction: column;
  width: 100%;

  &-field-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &-field {
    flex: 1;
    border: 1px solid var(--gray-400);
    border-radius: 30px;
    padding: 9px 16px;
    min-height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    transition: border-color 0.3s linear;
    resize: none;

    &::placeholder {
      color: var(--gray);
      font-size: 14px;
    }

    &[type='search']::-webkit-search-cancel-button {
      -webkit-appearance: none;
      display: none;
    }

    &.error {
      color: var(--red);
      border-color: var(--red);
    }

    &:disabled {
      background: var(--gray-light);
      color: var(--gray);
      pointer-events: none;
    }

    &:hover,
    &:focus {
      border-color: var(--black);
    }
  }

  &-label {
    margin: 0 0 8px;
    font-weight: 500;

    &.error {
      color: var(--red);
    }
  }

  &-error {
    font-size: 14px;
    color: var(--red);
    margin: 8px 0 0 4px;
  }

  &-icon {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    color: var(--gray);
    cursor: pointer;

    &.password-toggle:hover {
      color: var(--black);
    }
  }

  .loading {
    animation: loading 1s linear forwards infinite;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}

@media (max-width: $md2 + px) {
  .input {
    &-field {
      &::placeholder {
        font-size: 12px;
      }
    }
  }
}
</style>
