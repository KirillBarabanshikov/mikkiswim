<script setup lang="ts">
import { useField } from 'vee-validate'
import { useId } from 'vue'

interface Props {
  name: string // Название поля (обязательно)
  id?: string // Уникальный идентификатор
  validator?: any // Валидация
  label?: string // Текст метки
  defaultChecked?: boolean // Значение по умолчанию
  checkColor?: string // Цвет галочки
  borderColor?: string // Цвет границы
}

const {
  name,
  id = useId(),
  validator = undefined,
  label = null,
  defaultChecked = false,
  checkColor = 'black', // Цвет галочки по умолчанию
  borderColor = 'gray' // Цвет границы по умолчанию
} = defineProps<Props>()

// vee-validate: настройка поля
const { value, checked, errors, handleChange } = useField(
  name, // Имя поля
  validator, // Схема валидации
  {
    type: 'checkbox', // Тип поля
    checkedValue: true, // Значение, если флажок установлен
    uncheckedValue: false // Значение, если флажок не установлен
  }
)
</script>

<template>
  <div class="checkbox">
    <!-- Кнопка чекбокса -->
    <button
      @click="handleChange(!checked)"
      :id="id"
      type="button"
      :class="['checkbox-field', { checked, error: errors.length }]"
      :style="{ borderColor: borderColor }"
    >
      <!-- Если чекбокс -->
      <span v-if="checked" class="icon-check" :style="{ color: checkColor }">
        <IconCheck />
      </span>

      <span v-if="errors.length" class="checkbox-error">
        {{ errors[0] }}
      </span>
    </button>

    <!-- Метка чекбокса -->
    <label
      v-if="label"
      :for="id"
      :class="['checkbox-label', { error: errors.length }]"
    >
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

  input {
    position: absolute;
    width: 24px;
    height: 24px;
    opacity: 0;
    cursor: pointer;
  }

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

    .checkbox-error {
      color: var(--red);
      font-size: 8px;
      margin-top: 55px;
    }

    &.checked {
      border-color: var(--black);
    }

    &.error {
      color: var(--red);
      border-color: var(--red) !important;
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
