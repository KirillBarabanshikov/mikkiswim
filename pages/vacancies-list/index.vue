<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useVacancies } from '~/entities/vacancy/api/query'
import VacancyCard from '~/features/VacancyCard/VacancyCard.vue'
import VacancyForm from '~/features/VacancyForm/VacancyForm.vue'

const router = useRouter()

const isOpenForm = ref(false)
const selectedVacancyId = ref<number | null>(null)

const openForm = (vacancyId: number) => {
  if (selectedVacancyId.value === vacancyId) {
    isOpenForm.value = false
    nextTick(() => {
      isOpenForm.value = true
    })
  } else {
    selectedVacancyId.value = vacancyId
    isOpenForm.value = true
  }
}

const { data: vacancies, isPending } = useVacancies()

const goBack = () => {
  router.back()
}

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="vacancies">
    <div class="back-button" @click="goBack">
      <IconArrowLeft />
      Вакансии
    </div>

    <div v-if="vacancies && vacancies.length > 0" class="list">
      <template v-for="vacancy in vacancies" :key="vacancy.id">
        <VacancyCard :vacancy="vacancy" @open-form="openForm" />
      </template>
    </div>
    <div v-else-if="isPending" class="skeleton-list">
      <template v-for="n in 2" :key="n">
        <Skeleton height="360px" width="848px" />
      </template>
    </div>
    <div v-else class="zero-block">На данный момент вакансий нет</div>

    <VacancyForm
      v-if="isOpenForm"
      :key="selectedVacancyId + '-' + isOpenForm"
      :vacancy-id="selectedVacancyId"
      @close="isOpenForm = false"
    />
  </div>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.vacancies {
  padding: 24px 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .back-button {
    align-self: flex-start;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 20px;
    line-height: 155%;

    svg {
      width: 20px;
    }
  }

  .list {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .zero-block {
    margin-top: 64px;
    font-size: 24px;
    text-align: center;
  }

  .skeleton-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}

@media (max-width: #{$md2 + px}) {
  .vacancies {
    padding: 24px 16px;
  }
}
</style>
