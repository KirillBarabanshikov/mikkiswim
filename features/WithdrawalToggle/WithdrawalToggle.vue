<script setup lang="ts">
interface Props {
  activeView: 'cards' | 'info'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggle', view: 'cards' | 'info'): void
}>()

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)
</script>

<template>
  <div class="withdrawal-actions" v-if="!isMobile">
    <Button
      micro
      @click="() => $emit('toggle', 'cards')"
      :color="activeView === 'cards' ? 'black' : 'white-gray'"
    >
      Мои выводы
    </Button>
    <Button
      micro
      @click="() => $emit('toggle', 'info')"
      :color="activeView === 'info' ? 'black' : 'white-gray'"
    >
      Оформить вывод средств
    </Button>
  </div>
  <div v-else class="withdrawal-actions">
    <Button
      smallest
      @click="() => $emit('toggle', 'cards')"
      :color="activeView === 'cards' ? 'black' : 'white-gray'"
    >
      Мои выводы
    </Button>
    <Button
      smallest
      @click="() => $emit('toggle', 'info')"
      :color="activeView === 'info' ? 'black' : 'white-gray'"
    >
      Оформить вывод средств
    </Button>
  </div>
</template>
<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.withdrawal-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 32px;
  margin-bottom: 32px;
}

@media (max-width: $md3 + 'px') {
  .withdrawal-actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-direction: column;

    button {
      width: 100%;
    }
  }
}
</style>
