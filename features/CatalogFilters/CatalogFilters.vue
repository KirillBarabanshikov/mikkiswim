<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Filter } from '~/entities/filters/model/Filters'
import type { ToggleItem } from '~/share/UI/ToggleGroup/types'

const props = defineProps<{
  modelValue: boolean
  filters: Filter
}>()
const emit = defineEmits(['update:modelValue', 'applyFilters'])

const router = useRouter()
const route = useRoute()

const activeCatalogs = ref<ToggleItem | null>(null)
const activeColors = ref<ToggleItem | null>(null)
const activeSizes = ref<ToggleItem | null>(null)

const minPrice = ref<number | null>(props.filters.prices.min)
const maxPrice = ref<number | null>(props.filters.prices.max)

const toggleCatalogs = computed<ToggleItem[]>(() =>
  props.filters.childCatalogs.map((category) => ({
    id: category.id,
    value: category.slug,
    content: category.title
  }))
)

const toggleColors = computed<ToggleItem[]>(() =>
  props.filters.colors.map((color) => ({
    id: color.value,
    value: color.value,
    content: color.content
  }))
)

const toggleSizes = computed<ToggleItem[]>(() =>
  props.filters.sizes.map((size) => ({
    id: size.value,
    value: size.value,
    content: size.content
  }))
)

const applyFilters = async () => {
  const queryParams: Record<string, string | number> = {}

  if (activeCatalogs.value?.value)
    queryParams.category = activeCatalogs.value.value
  if (activeColors.value?.value) queryParams.color = activeColors.value.value
  if (activeSizes.value?.value) queryParams.size = activeSizes.value.value
  if (minPrice.value !== null && minPrice.value !== props.filters.prices.min)
    queryParams.priceStart = minPrice.value
  if (maxPrice.value !== null && maxPrice.value !== props.filters.prices.max)
    queryParams.priceEnd = maxPrice.value

  await router.push({ query: { ...queryParams } })
  emit('update:modelValue', false)
  emit('applyFilters')
}

watch(props, (val) => {
  if (val.modelValue) {
    const query = route.query

    if (query.category)
      activeCatalogs.value =
        toggleCatalogs.value.find((item) => item.value === query.category) ||
        null
    else activeCatalogs.value = null

    if (query.color)
      activeColors.value =
        toggleColors.value.find((item) => item.value === query.color) || null
    else activeColors.value = null

    if (query.size)
      activeSizes.value =
        toggleSizes.value.find((item) => item.value === query.size) || null
    else activeSizes.value = null

    minPrice.value = query.priceStart
      ? Number(query.priceStart)
      : props.filters.prices.min
    maxPrice.value = query.priceEnd
      ? Number(query.priceEnd)
      : props.filters.prices.max
  }
})
</script>

<template>
  <transition name="menu-right">
    <div v-if="modelValue" class="filters">
      <form class="filters-content" @submit.prevent="applyFilters">
        <div v-if="filters.childCatalogs" class="filters-row">
          <div class="filters-label">Тип</div>
          <div class="filters-group">
            <ToggleGroup
              v-model="activeCatalogs"
              :list="toggleCatalogs"
              type="single"
              variant="buttons"
              name="category-selection"
            />
          </div>
        </div>

        <div v-if="filters.colors" class="filters-row">
          <div class="filters-label">Цвет</div>
          <div class="filters-group">
            <ToggleGroup
              v-model="activeColors"
              :list="toggleColors"
              type="single"
              variant="colors"
              name="colors-selection"
            />
          </div>
        </div>

        <div v-if="filters.sizes" class="filters-row">
          <div class="filters-label">Размер</div>
          <div class="filters-group">
            <ToggleGroup
              v-model="activeSizes"
              :list="toggleSizes"
              type="single"
              variant="buttons"
              name="sizes-selection"
            />
          </div>
        </div>
        <div class="filters-row">
          <div class="filters-label">
            Цена
            <span
              >от {{ props.filters.prices.min }}₽ до
              {{ props.filters.prices.max }}₽</span
            >
          </div>
          <div class="filters-group">
            <div class="filters-price">
              <Input
                v-model.number="minPrice"
                type="number"
                placeholder="От"
                :min="props.filters.prices.min"
                :max="maxPrice"
                name="min"
              />
              <Input
                v-model.number="maxPrice"
                type="number"
                placeholder="До"
                :min="minPrice"
                :max="props.filters.prices.max"
                name="max"
              />
            </div>
          </div>
        </div>

        <div class="filters-row">
          <Button @click="applyFilters">Показать результаты</Button>
        </div>
      </form>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.filters {
  position: absolute;
  z-index: 5;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100dvh;
  background-color: var(--white);
  padding: 24px 36px 48px;
  box-shadow: 0 25px 25px #0000001a;

  &-row {
    &:last-child {
      margin-top: auto;
      width: 100%;

      .btn {
        width: 100%;
      }
    }
  }

  &-title {
    font-size: 20px;
    margin: 0 0 32px;
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 0 0 42px;
    height: 100%;
  }

  &-label {
    margin: 0 0 16px;
    font-weight: 700;

    span {
      font-weight: 400;
    }
  }

  &-price {
    display: flex;
    gap: 12px;
  }
}
</style>
