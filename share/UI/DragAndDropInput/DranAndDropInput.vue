<script setup lang="ts">

interface Props {
  modelValue: File | null
  placeholder?: string
  accept?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
}>()

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const fileName = computed(() => (props.modelValue ? props.modelValue.name : ''))

const onDragOver = (e: DragEvent) => {
  isDragging.value = true
}

const onDragLeave = (e: DragEvent) => {
  isDragging.value = false
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
    const file = e.dataTransfer.files[0]
    emit('update:modelValue', file)
  }
}

const onClick = () => {
  fileInput.value?.click()
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length) {
    const file = target.files[0]
    emit('update:modelValue', file)
  }
}
</script>
<template>
  <div
    class="drag-drop-area"
    :class="{ dragging: isDragging }"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    @click="onClick"
  >
    <input
      type="file"
      ref="fileInput"
      :accept="accept"
      style="display: none"
      @change="onFileChange"
    />
    <div class="file-content">
      <span v-if="fileName">{{ fileName }}</span>
      <span v-else>{{
        placeholder || 'Выберите файл или перетащите в поле'
      }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drag-drop-area {
  border: 2px dashed var(--gray-400);
  border-radius: 48px;
  padding: 5px 8px;
  height: 39px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &.dragging {
    background-color: #f0f0f0;
  }

  .file-content {
    font-size: 12px;
    color: var(--black);
  }
}
</style>
