<script setup lang="ts">
import { useMessage } from '~/entities/message/api/query'
import MessageCard from '~/features/MessageCard/MessageCard.vue'

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)

const { data, isPending } = useMessage()
</script>

<template>
  <section class="messages">
    <div v-if="isPending">
      <div v-if="!isMobile" class="list">
        <Skeleton width="500px" height="300px" />
      </div>
      <div v-else class="list">
        <Skeleton width="360px" height="300px" />
      </div>
    </div>
    <div v-else-if="data?.length === 0" class="zero-block">
      <div class="subtitle">Сообщений нет</div>
      Здесь располагается информация о скидках, акциях, статусе заказа, <br />
      уведомления о поступлении купальников нужного размера.
    </div>
    <div v-else class="list">
      <template v-for="message in data" :key="message">
        <MessageCard :message="message" />
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.messages {
  flex: 0 0 554px;

  .zero-block {
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;

    .subtitle {
      font-size: 20px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}

@media (max-width: $md2 + 'px') {
  .messages {
    max-width: 554px;
    flex: 1;
  }
}
</style>
