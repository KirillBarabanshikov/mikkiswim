<script setup lang="ts">
import { ref } from 'vue'

import IconClose from '~/share/UI/Icons/IconClose.vue'
import IconEdit from '~/share/UI/Icons/IconEdit.vue'

type CProps = {
  title: string
  value?: string
  warning?: string
  component: object
  isBigTitle?: boolean
}
defineProps<CProps>()

const isChange = ref(false)

const toggleChange = () => (isChange.value = !isChange.value)
const closeChange = () => (isChange.value = false)
</script>

<template>
  <article class="card" :class="{ active: isChange }">
    <div class="card-header" @click="toggleChange">
      <div class="header-content">
        <p class="subtitle" :class="{ big: isBigTitle }">{{ title }}</p>
        <p v-if="!isChange && value" class="value">{{ value }}</p>
      </div>
      <Button variant="gray" outline class="toggle-button">
        <span>{{ isChange ? 'Закрыть' : 'Изменить' }}</span>
        <IconClose v-if="isChange" class="icon" />
        <IconEdit v-else class="icon" />
      </Button>
    </div>

    <div class="card-content">
      <div class="content-inner">
        <p v-if="warning" class="warning">{{ warning }}</p>
        <component :is="component" v-bind="$attrs" @close="closeChange" />
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use 'CabinetChangeCard';
</style>
