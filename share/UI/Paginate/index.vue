<script setup lang="ts">
import { VueAwesomePaginate } from 'vue-awesome-paginate'

interface Props {
  totalItems: number
  currentPage: number
  itemsPerPage?: number
  maxPagesShown?: number
  showEndingButtons?: boolean
}

const emit = defineEmits<{
  update: [value: number]
  click: [value: number]
}>()

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 9,
  maxPagesShown: 5,
  currentPage: 1
})

const localPage = ref(props.currentPage)

const onClickHandler = (page: number) => {
  localPage.value = page
  emit('update', page)
}

watchEffect(() => {
  localPage.value = props.currentPage
})
</script>

<template>
  <vue-awesome-paginate
    :total-items
    :items-per-page
    :max-pages-shown
    :show-ending-buttons
    v-model="localPage"
    @click="onClickHandler"
  >
    <template #first-page-button>
      <IconsDoubleArrowLeft />
    </template>
    <template #last-page-button>
      <IconsDoubleArrowRight />
    </template>
    <template #next-button>
      <IconsArrowRight />
    </template>
    <template #prev-button>
      <IconsArrowLeft />
    </template>
  </vue-awesome-paginate>
</template>

<style lang="scss">
@use '/app/assets/scss/variables' as *;

.pagination-container {
  display: flex;
  padding: 0 18px !important;
  background: var(--bg-white);
  width: 100%;
  border-radius: 16px;

  li {
    height: 64px;
    flex: 1 1 64px;
  }
}

.paginate-buttons {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 20px;
  font-weight: 700;
  transition: all 0.3s linear;
  position: relative;

  &::after {
    content: '';
    width: 100%;
    height: 4px;
    border-radius: 2px 2px 0 0;
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    background: var(--bg-blue);
    opacity: 0;
    transition: opacity 0.3s linear;
  }

  &.active-page {
    &::after {
      opacity: 1;
    }
  }

  svg {
    width: 18px;
    height: 18px;
  }
}

.paginate-buttons:hover {
  background-color: var(--bg-primary);
  color: var(--text-blue);
}

.dark {
  .pagination-container {
    background: var(--bg-white-alpha-5);
  }

  .paginate-buttons {
    color: var(--text-white);
  }

  .paginate-buttons:hover {
    background: var(--bg-white-alpha-5);
    color: var(--text-blue);
  }
}
</style>
