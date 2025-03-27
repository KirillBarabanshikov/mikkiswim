<script setup lang="ts">
import IconArrowRight from '~/share/UI/Icons/IconArrowRight.vue'

type SProps = {
  type: 'search' | 'history'
  id: number
  title: string
}
type SEmits = {
  (eventName: 'onDelete', id: number): void
  (eventName: 'onTarget', value: string): void
}
const props = defineProps<SProps>()
const emits = defineEmits<SEmits>()
const isHistory = props.type === 'history'
const isSearch = props.type === 'search'
const onTarget = () => {
  emits('onTarget', props.title)
}
const onDelete = () => {
  emits('onDelete', props.id)
}
</script>

<template>
  <article class="list-item" @click="onTarget">
    <IconHistorySearch v-if="isHistory" class="icon-history" />
    <IconSearch v-if="isSearch" class="icon-search" />
    <p class="item-value">{{ title }}</p>
    <IconClose v-if="isHistory" class="icon-close" @click="onDelete" />
    <IconArrowRight class="icon-arrow" />
  </article>
</template>

<style scoped lang="scss">
.icon-close,
.icon-history,
.icon-search,
.icon-arrow {
  max-width: 24px;
  max-height: 24px;
}

.icon-search {
  color: #dcdcdc;
}

.icon-arrow,
.icon-close {
  color: #dcdcdc;
  cursor: pointer;

  &:hover {
    color: var(--black);
  }
}

.list {
  &-item {
    padding: 8px 7px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;

    .icon-close,
    .icon-arrow {
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:hover {
      background-color: var(--gray-100);
      transition: background-color 0.2s ease;
      border-radius: 7px;

      .icon-close,
      .icon-arrow {
        opacity: 1;
      }
    }
  }
}

.item {
  &-value {
    flex: 1;
    color: var(--black);
  }
}
</style>
