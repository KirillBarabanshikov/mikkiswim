<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue'

interface Option {
  label: string
  value: any
}

const props = defineProps<{
  options: Option[]
  modelValue: any
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const isOpen = ref(false)

const selectRef = ref<HTMLElement | null>(null)

const resolvedPlaceholder = computed(() => {
  if (props.options.length === 0) {
    return 'Сейчас нет заказов которые можно вернуть'
  }
  return props.placeholder || 'Выбор заказа'
})

const toggleDropdown = () => {
  if (props.options.length === 0) return
  isOpen.value = !isOpen.value
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

onClickOutside(selectRef, () => {
  isOpen.value = false
})

const selectedLabel = computed(() => {
  if (props.modelValue && typeof props.modelValue === 'object') {
    return props.modelValue.label
  }
  const selected = props.options.find((opt) => opt.value === props.modelValue)
  return selected ? selected.label : ''
})
const {
  public: { API }
} = useRuntimeConfig()

const placeholder = computed(() => props.placeholder || 'Выбор заказа')
</script>

<template>
  <div class="select-wrapper" ref="selectRef">
    <div class="select-display" @click="toggleDropdown">
      <span v-if="!selectedLabel" class="placeholder">{{
        resolvedPlaceholder
      }}</span>
      <span v-else class="selected">{{ selectedLabel }}</span>
      <IconArrowDown class="arrow" :class="{ open: isOpen }" />
    </div>
    <div v-if="isOpen" class="options">
      <div
        v-for="option in options"
        :key="option.value"
        class="option"
        @click.stop="selectOption(option)"
      >
        <div class="option-row">
          <span class="option-label">{{ option.label }}</span>
          <div class="option-products">
            <img
              v-for="(imgUrl, index) in option.images"
              :key="index"
              :src="`${API}${imgUrl}`"
              alt="Продукт"
              class="product-image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-wrapper {
  position: relative;
  width: 100%;
  cursor: pointer;
  user-select: none;

  .select-display {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 16px;
    border: 0.5px solid var(--gray-400);
    border-radius: 30px;
    background-color: #fff;

    svg {
      width: 18px;
    }

    .placeholder {
      font-size: 14px;
      color: var(--gray);
    }

    .arrow {
      transition: transform 0.2s ease;

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .options {
    position: absolute;
    top: calc(100% + 15px);
    left: 0;
    right: 0;
    padding: 10px 0;
    border-radius: 8px;
    background: #fff;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    box-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.04),
      0 12px 12px 0 rgba(0, 0, 0, 0.04);

    .option {
      padding: 10px 16px;

      &:hover {
        background: var(--gray-400);
      }

      .option-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .option-label {
        font-size: 14px;
      }

      .option-products {
        display: flex;
        gap: 4px;
        align-items: center;

        .product-image {
          width: 30px;
          height: 30px;
          object-fit: cover;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
