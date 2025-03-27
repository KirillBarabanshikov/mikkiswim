<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

import IconClose from '~/share/UI/Icons/IconClose.vue'
import { useBodyLock } from '~/share/utils/bodyLock'

interface ModalEmits {
  (eventName: 'close'): void

  (eventName: 'update:isOpen', b: boolean): void
}

interface Props {
  isOpen?: boolean
}

const emits = defineEmits<ModalEmits>()
const props = defineProps<Props>()

const { isOpen } = toRefs(props)
const { lock, unlock } = useBodyLock()

const close = () => {
  emits('close')
  emits('update:isOpen', false)
}

watch(
  () => props.isOpen,
  (value) => {
    if (!value) unlock()
    else lock()
  }
)

onMounted(() => {
  if (props.isOpen) lock()
})
onBeforeUnmount(unlock)
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="modal" @click="close">
      <div class="modal-content" @click.stop>
        <div class="modal-close" @click="close">
          <IconClose />
        </div>
        <slot name="content" />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.modal {
  position: fixed;
  inset: 0;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);

  &-close {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 24px;
    cursor: pointer;
  }

  &-content {
    position: relative;
    z-index: 6;
    width: 100%;
    max-width: 554px;
    padding: 24px;
    border-radius: 16px;
    background-color: var(--white);
    display: flex;
    justify-content: center;
    align-content: center;
    transition: 0.3s all ease-in-out;

    @media (max-width: ($md3 + px)) {
      padding: 48px 20px;
      max-height: 100dvh;
      max-width: none;
      height: 100%;
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>
