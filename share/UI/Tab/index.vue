<script setup lang="ts">
import { onMounted } from 'vue'

type TabProps = {
  titles: Array<String>
}
type TabEmits = {
  (eventName: 'changeTab', title: string): void
}

type TabItem = {
  title: string
  isActive: boolean
  onActive: () => void
  onDisable: () => void
}
const props = defineProps<TabProps>()
const emits = defineEmits<TabEmits>()
const tabs = ref()

const initTabs = () => [
  ...props.titles.map((title) => ({
    title,
    isActive: false,
    onActive: function () {
      this.isActive = true
      emits('changeTab', this.title as string)
    },
    onDisable: function () {
      this.isActive = false
    }
  }))
]

const onClick = (e: Event, tab: TabItem): void => {
  const title = tab.title
  tabs.value.map((tab: TabItem) => {
    tab.title !== title ? tab.onDisable.apply(tab) : tab.onActive.apply(tab)
  })
}
onMounted(() => {
  if (props.titles) tabs.value = initTabs()
})
</script>

<template>
  <section class="tab">
    <Transition name="fade">
      <div v-if="tabs" class="tab-container">
        <div
          v-for="tab in tabs"
          :key="tab"
          :class="['tab-item', { active: tab.isActive }]"
          @click="(e) => onClick(e, tab)"
        >
          {{ tab.title }}
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.tab {
  width: 100%;
  padding: 4px;
  background-color: var(--bg-third);
  border-radius: 12px;

  &-container {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &-item {
    width: 100%;
    font-size: 14px;
    line-height: 16.8px;
    border-radius: 12px;
    text-align: center;
    padding: 8px 0;
    transition: 0.3s all ease-in-out;
    cursor: pointer;
    color: var(--text-third);

    &:hover {
      color: var(--text-secondary);
      background-color: var(--bg-fourth);
    }

    &.active {
      color: var(--text-white);
      background-color: #58687c;
    }
  }
}
</style>
