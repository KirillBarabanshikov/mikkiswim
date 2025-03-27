<script setup lang="ts">
defineProps<{
  progress: string | number
  color?: string
  big?: boolean
}>()
</script>

<template>
  <div :class="['progress', { big: big }, color]"></div>
</template>

<style scoped lang="scss">
@use 'Progress';

.progress {
  &:before {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    width: v-bind(progress);
    height: 4px;
    border-radius: 4px;
    background: var(--yellow);
  }

  &.big {
    height: 15px;
    border-radius: 20px;
    &:before {
      height: 15px;
      border-radius: 20px;
    }
  }

  &.silver {
    background: var(--white);
    &:before {
      background: var(--silver);
    }
  }
  &.gold {
    background: var(--white);
    &:before {
      background: var(--yellow);
    }
  }
  &.platinum {
    background: var(--white);
    &:before {
      background: linear-gradient(
        90deg,
        #76d6ff 0%,
        rgba(106, 236, 135, 0.74) 18.61%,
        rgba(111, 255, 229, 0.9) 47.77%,
        rgba(217, 255, 154, 0.91) 77.98%,
        #95ffd9 100%
      );
    }
  }
  &.brilliant {
    background: var(--white);
    &:before {
      background: linear-gradient(
        90deg,
        #52bfed 0%,
        #a8f5ff 33.97%,
        rgba(114, 204, 255, 0.65) 60.15%,
        rgba(50, 230, 255, 0.52) 100%
      );
    }
  }
}
</style>
