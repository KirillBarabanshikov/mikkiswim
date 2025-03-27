<script setup lang="ts">
import { useField } from 'vee-validate'

import IconStar from '~/share/UI/Icons/IconStar.vue'

const props = defineProps<{
  name: string
  validator?: any
}>()

const { value, errorMessage, validate } = useField(
  () => props.name,
  props.validator,
  {
    validateOnValueUpdate: false
  }
)

const activeStar = ref(0)

const setStars = (count: number) => {
  value.value = count.toString()
  validate()
}
</script>

<template>
  <div class="stars-picker">
    <IconStar
      v-for="item in 5"
      :key="item"
      :class="[
        'star-picker',
        { active: item <= value },
        { hover: item <= activeStar }
      ]"
      @mouseenter="activeStar = item"
      @mouseleave="activeStar = 0"
      @click="setStars(item)"
    />
    <input type="hidden" :value="value" />
    <div v-if="errorMessage" class="input-error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.stars-picker {
  display: flex;
  align-items: center;
  gap: 2px;

  .star-picker {
    width: 20px;
    height: 20px;
    color: #dcdcdc;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover,
    &.hover {
      color: var(--yellow);
      opacity: 0.5;
    }

    &.active {
      color: var(--yellow);
    }
  }
}

.input-error {
  color: red;
  font-size: 14px;
  line-height: 155%;
  margin-left: 8px;
}
</style>
