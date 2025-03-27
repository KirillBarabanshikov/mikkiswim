<script setup lang="ts">
import type { Vacancy } from '~/entities/vacancy/model/Vacancy'

const props = defineProps<{ vacancy: Vacancy }>()
const emit = defineEmits(['open-form'])

const isOpen = ref(false)

const openForm = () => {
  emit('open-form', props.vacancy.id)
}

const { width } = useWindowSize()

const toggleDetails = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="vacancy-card">
    <div class="vacancy-card-wrapper">
      <div class="subtitle">{{ vacancy.title }}</div>
      <div class="row">
        <div class="item">
          <div class="label">Локация</div>
          <div class="value" v-html="vacancy.location"></div>
        </div>
        <div class="item">
          <div v-if="width >= 768" class="label">Тип занятости</div>
          <div v-else class="label">Занятость</div>
          <div class="value">{{ vacancy.location }}</div>
        </div>
        <div class="item">
          <div class="label">Опыт</div>
          <div class="value">{{ vacancy.experience }}</div>
        </div>
      </div>
      <div
        class="description"
        v-html="vacancy.previewDescriptionsWithoutTags"
      />
      <div
        class="description-details"
        :class="{ open: isOpen }"
        v-html="vacancy.description"
      />
      <div class="actions">
        <Button color="white" @click="toggleDetails">
          {{ isOpen ? 'Свернуть' : 'Подробнее' }}
        </Button>
        <Button color="white" @click="openForm">Откликнуться</Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.vacancy-card {
  background: var(--gray-300);
  max-width: 848px;
  border-radius: 16px;
  padding: 32px;

  &-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .subtitle {
      font-weight: 700;
      font-size: 24px;
      line-height: 150%;
    }

    .row {
      display: flex;
      justify-content: space-between;
      max-width: 80%;

      .item {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .label {
          font-weight: 700;
          font-size: 14px;
          line-height: 155%;
        }

        .value {
          font-weight: 400;
          font-size: 14px;
          line-height: 155%;
        }
      }
    }

    .description {
      font-weight: 400;
      font-size: 14px;
      line-height: 155%;
    }

    .description-details {
      display: grid;
      font-size: 14px;
      line-height: 155%;
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transition:
        max-height 0.3s ease,
        opacity 0.3s ease;

      &.open {
        max-height: 1000px;
        opacity: 1;
      }

      :deep(ul) {
        list-style: inside;

        li {
          margin-bottom: 5px;
        }
      }
    }

    .actions {
      display: flex;
      gap: 24px;

      button {
        min-width: 224px;
      }
    }
  }
}

@media (max-width: #{$md3 + px}) {
  .row {
    gap: 25px;
  }

  .subtitle {
    font-size: 19px !important;
  }

  .actions {
    flex-direction: column;
    gap: 16px !important;

    button {
      min-width: 100%;
    }
  }
  .item {
    .label {
      font-size: 14px !important;
    }
    .value {
      font-size: 12px !important;
    }
  }
  .description {
    font-size: 12px !important;
  }
  .description-details {
    font-size: 12px !important;
  }
}
</style>
