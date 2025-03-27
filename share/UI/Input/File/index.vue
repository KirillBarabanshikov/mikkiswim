<script setup lang="ts">
import type { Ref } from 'vue'

type FileInputProps = {
  modelValue: FileList | null
}
type FileInputEmits = {
  (eventName: 'update:modelValue', files: FileList | null): void
  (eventName: 'changeFile', files: FileList | null): void
}
const props = defineProps<FileInputProps>()
const emits = defineEmits<FileInputEmits>()
const files: Ref<FileList | null> = ref(props.modelValue)

const onChangeFiles = (e: Event) => {
  files.value = (e.target as HTMLInputElement).files
  emits('changeFile', files.value)
  emits('update:modelValue', files.value)
}
const onClearFiles = () => {
  files.value = null
  emits('update:modelValue', null)
}
</script>

<template>
  <div class="files">
    <Transition name="fade">
      <div v-if="files" class="files-delete">
        <IconsClose @click="onClearFiles" />
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="files" class="files-name">name files</div>
    </Transition>
    <div class="files-icon">
      <IconsClip />
      <input type="file" @change="onChangeFiles" />
    </div>
    <div v-if="files" class="files-name">name files</div>
    <div v-if="files" class="files-delete">
      <IconsClose />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.dark {
  .files {
    &-icon {
      background: var(--bg-white-alpha-10);
    }
  }
}

.files {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  &-icon {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background-color: var(--bg-white);
    border-radius: 4px;
    padding: 2px;

    input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }

  &-name {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0 5%;
    padding: 6px 0;
    border-radius: 4px;
    background-color: var(--bg-white);
  }

  &-delete {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: var(--bg-white);
  }
}
</style>
