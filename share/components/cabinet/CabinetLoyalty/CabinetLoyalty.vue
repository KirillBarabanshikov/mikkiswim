<script setup lang="ts">
import { useLoyaltyPrograms } from '~/entities/loyaltyProgram/api/query'
import { useAuthStore } from '~/share/store/authStore'
import { useUserStore } from '~/share/store/userStore'
import Progress from '~/widgets/Cabinet/ProgressBar/Progress.vue'

const levels = ['bronze', 'silver', 'gold', 'platinum', 'brilliant']
const authStore = useAuthStore()
const userStore = useUserStore()

const { data: loyaltyPrograms } = useLoyaltyPrograms()

const getRemainingToNextLevel = (
  currency: number,
  moneySpent: number
): string => {
  const remaining = currency - moneySpent
  return remaining > 0
    ? `${useFormatPrice(remaining)}₽ до перехода`
    : 'Ваш уровень максимален'
}
</script>

<template>
  <section class="loyalty">
    <div class="loyalty-title">Уровни в программе лояльности</div>
    <div class="loyalty-text">
      Чем больше общая сумма заказов, тем выше уровень - от него зависит
      накопительная скидка с покупки.
    </div>
    <div class="loyalty-list">
      <template v-for="(item, index) in loyaltyPrograms" :key="item">
        <div
          :class="[
            'item',
            levels[index],
            { active: (userStore.user?.loyaltyProgram?.id ?? 0) === item.id },
            { prev: (userStore.user?.loyaltyProgram?.id ?? 0) > item.id }
          ]"
        >
          <div class="item-img">
            <img :src="`/img/cabinet_page/${levels[index]}.webp`" alt="" />
          </div>
          <div
            v-if="(userStore.user?.loyaltyProgram?.id ?? 0) > item.id"
            class="item-status"
          >
            Получено
          </div>
          <div
            v-if="userStore.user?.loyaltyProgram?.id === item.id"
            class="item-status"
          >
            Текущий уровень
          </div>
          <div class="item-level">{{ item.level }}</div>
          <div class="item-title">{{ item.title }}</div>
          <div class="item-discount">
            <div class="discount">
              <span>{{ item.discount * 100 }}%</span> скидка
            </div>
            <div class="discount">
              <span>{{ item.cumulativeDiscount * 100 }}%</span> скидка
              накопительная
            </div>
          </div>
          <div
            v-if="(userStore.user?.loyaltyProgram?.id ?? 0) < item.id"
            class="item-progress"
          >
            <Progress
              :progress="
                ((userStore.user?.moneySpent || 0) /
                  (item.currency ? item.currency : 1)) *
                  100 +
                '%'
              "
              :color="levels[index]"
              big
            />
            <span>
              {{
                getRemainingToNextLevel(
                  item.currency,
                  userStore.user?.moneySpent || 0
                )
              }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'CabinetLoyalty';
</style>
