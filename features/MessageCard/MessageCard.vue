<script setup lang="ts">
import type { Message } from '~/entities/message/model/Message'

const props = defineProps<{ message: Message }>()

const {
  public: { API }
} = useRuntimeConfig()
</script>

<template>
  <div class="message-card">
    <div class="subtitle">{{ message.title }}</div>
    <div class="message-actions">
      <div class="item">Перейти к товару</div>
      <div class="item">В корзину</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'MessageCard';
</style>
