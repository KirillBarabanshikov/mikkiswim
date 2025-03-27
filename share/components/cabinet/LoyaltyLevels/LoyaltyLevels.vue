<script setup lang="ts">
import { computed } from 'vue'

import { useLoyaltyPrograms } from '~/entities/loyaltyProgram/api/query'
import { useAuthStore } from '~/share/store/authStore'
import { useUserStore } from '~/share/store/userStore'
import IconArrowRight from '~/share/UI/Icons/IconArrowRight.vue'
import Progress from '~/widgets/Cabinet/ProgressBar/Progress.vue'

const authStore = useAuthStore()
const userStore = useUserStore()

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)
const emit = defineEmits(['menu-item-selected'])

const levels = ['bronze', 'silver', 'gold', 'platinum', 'brilliant']

const toLoyalty = () => {
  emit('menu-item-selected', 'loyalty')
}

const { data: loyaltyPrograms, isPending } = useLoyaltyPrograms()

const progressValue = computed(() => {
  if (!loyaltyPrograms.value || !userStore.user) return '0%'

  const currentIndex = loyaltyPrograms.value.findIndex(
    (item) => item.id === userStore.user?.loyaltyProgram?.id
  )
  if (currentIndex === -1 || currentIndex + 1 >= loyaltyPrograms.value.length) {
    return '100%'
  }

  const nextLevel = loyaltyPrograms.value[currentIndex + 1]

  if (!nextLevel.currency) return '0%'

  const progressPercent = (userStore.user.moneySpent / nextLevel.currency) * 100

  return Math.min(100, Math.floor(progressPercent)) + '%'
})

const currentColor = computed(() => {
  if (!loyaltyPrograms.value || !userStore.user) return ''

  const currentIndex = loyaltyPrograms.value.findIndex(
    (item) => item.id === userStore.user?.loyaltyProgram?.id
  )

  return levels[currentIndex] ?? ''
})

const useFormatPrice = (price: number): string =>
  price.toLocaleString('ru-RU', { maximumFractionDigits: 0 })

const sumToNextLevel = () => {
  if (!loyaltyPrograms.value || !userStore.user) return 'Бронзовый уровень'

  const currentIndex = loyaltyPrograms.value.findIndex(
    (item) => item.id === userStore.user!.loyaltyProgram?.id
  )

  if (currentIndex === -1 || currentIndex + 1 >= loyaltyPrograms.value.length) {
    return 'Бриллиантовый уровень'
  }

  const nextLevel = loyaltyPrograms.value[currentIndex + 1]
  const toNextLevel = nextLevel.currency - (userStore.user.moneySpent ?? 0)

  return toNextLevel > 0
    ? useFormatPrice(toNextLevel) + ' Р до нового уровня'
    : 'Бриллиантовый уровень'
}

const mikkiBalance = computed(() => userStore.user?.mikkiCoins || 0 > 0)
</script>

<template>
  <div class="loyalty">
    <div class="loyalty-title">Mikkicoins</div>
    <section v-if="userStore.user?.coachData">Золотая карта Mikkiswim</section>
    <section v-else class="levels">
      <div class="levels-title" @click="toLoyalty">
        <p>Уровни лояльности</p>
        <IconArrowRight />
      </div>
      <div v-if="loyaltyPrograms" class="levels-track">
        <Progress :progress="progressValue" :color="currentColor" big />
      </div>
      <div v-else class="levels-track"></div>
      <div v-if="loyaltyPrograms" class="levels-new-level">
        <p>
          {{ sumToNextLevel() }}
        </p>
      </div>
      <div v-else class="levels-new-level"></div>
    </section>
    <section :class="['balance', { active: mikkiBalance }]">
      <p class="balance-count">{{ userStore.user?.mikkiCoins ?? '0' }}</p>
      <IconMikki />
    </section>
  </div>
</template>

<style scoped lang="scss">
@use 'LoyaltyLevels';
</style>
