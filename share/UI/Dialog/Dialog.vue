<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'

import IconClose from '~/share/UI/Icons/IconClose.vue'

interface ModalProps {
  isOpen: boolean
  hasClose?: boolean
}

const props = defineProps<ModalProps>()
const emits = defineEmits<{
  (e: 'close'): void
}>()

const closeModal = () => {
  emits('close')
}
</script>

<template>
  <Transition name="fade">
    <div v-if="props.isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <slot name="title"> </slot>
        <slot name="description"> </slot>
        <slot />
        <button v-if="props.hasClose" class="modal-close" @click="closeModal">
          <IconClose />
        </button>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.modal-content {
  background-color: var(--white);
  padding: 24px;
  border-radius: 16px;
  position: relative;
  max-width: 850px;
  max-height: 85vh;
  overflow: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 48px 20px;
    max-height: 100vh;
    height: 100%;
    border-radius: 0;
  }
}

.modal-title {
  margin: 0;
}

.modal-description {
  margin: 0 0 16px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.1);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
