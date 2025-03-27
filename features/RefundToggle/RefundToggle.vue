<script setup lang="ts">
interface Props {
  activeView: 'cards' | 'info'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggle', view: 'cards' | 'info'): void
}>()
</script>

<template>
  <div class="refund-actions">
    <Button
      micro
      @click="() => $emit('toggle', 'cards')"
      :color="activeView === 'cards' ? 'black' : 'white-gray'"
    >
      Мои возвраты
    </Button>
    <Button
      micro
      @click="() => $emit('toggle', 'info')"
      :color="activeView === 'info' ? 'black' : 'white-gray'"
    >
      Условия и сроки возврата
    </Button>
  </div>
</template>
<style scoped lang="scss">
.refund-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 32px;
  margin-bottom: 32px;
}
</style>
