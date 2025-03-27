<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { usePromocode } from '~/entities/promocode/api/query'
import IconFailed from '~/share/UI/Icons/IconFailed.vue'
import IconPromo from '~/share/UI/Icons/IconPromo.vue'
import IconSuccess from '~/share/UI/Icons/IconSuccess.vue'
import Input from '~/share/UI/Input/index.vue'

const promocodeInput = ref('')

const {
  data: promocode,
  error,
  isLoading
} = usePromocode(computed(() => promocodeInput.value.trim()))

const emit = defineEmits<{
  (e: 'apply', discount: number): void
}>()

watch(promocode, (newVal) => {
  if (newVal) {
    emit('apply', newVal.percent)
  } else {
    emit('apply', 0)
  }
})

watch(promocodeInput, (newVal) => {
  if (!newVal.trim()) {
    emit('apply', 0)
  }
})
</script>

<template>
  <div class="promo">
    <div class="promo-left">
      <span><IconPromo /> Промокод</span>
      <p v-if="promocodeInput" :class="promocode ? 'success' : 'failed'">
        {{ promocode ? 'Применен' : 'Недействителен' }}
      </p>
    </div>
    <div class="promo-input">
      <Input v-model="promocodeInput" placeholder="Код" name="инпут" />
      <IconSuccess v-if="promocodeInput && promocode" class="success" />
      <IconFailed v-if="promocodeInput && error" class="failed" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.promo {
  display: flex;
  align-items: center;
  gap: 30px;

  &-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
      display: flex;
      align-items: center;
      gap: 8px;

      svg {
        width: 18px;
      }
    }

    p {
      font-size: 12px;

      &.success {
        color: var(--green);
      }

      &.failed {
        color: var(--red);
      }
    }
  }

  &-input {
    position: relative;

    input {
      padding: 0 48px 0 16px;
    }

    svg {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;

      &.success {
        color: var(--green);
      }

      &.failed {
        color: var(--red);
      }
    }
  }
}
</style>
