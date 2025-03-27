<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import { computed, ref } from 'vue'

import {
  type ListItem,
  menuItems
} from '~/share/components/cabinet/CabinetMenu/model/model'
import CoachPromocode from '~/share/components/cabinet/CoachPromocode/CoachPromocode.vue'
import LoyaltyLevels from '~/share/components/cabinet/LoyaltyLevels/LoyaltyLevels.vue'
import ManagerBlock from '~/share/components/cabinet/ManagerBlock/ManagerBlock.vue'
import { useAuthStore } from '~/share/store/authStore'
import { useUserStore } from '~/share/store/userStore'
import IconArrowRight from '~/share/UI/Icons/IconArrowRight.vue'

const emit = defineEmits(['menu-item-selected'])

const userStore = useUserStore()
const authStore = useAuthStore()

const route = useRoute()
const router = useRouter()

const activeItem = ref<ListItem | null>(null)

const setActive = (item: ListItem) => {
  activeItem.value = item
  emit('menu-item-selected', item.chapter)
  setRouteChapter(item.chapter)
}

const handleLoyaltyLevelSelected = (chapter: string) => {
  emit('menu-item-selected', chapter)
}

const setRouteChapter = (chapter: string) =>
  navigateTo(`/cabinet?chapter=${chapter}`)

const filteredMenuItems = computed(() => {
  // Если пользователь B2B – показываем только два маршрута
  if (userStore.user?.userB2B) {
    return menuItems.value.filter((item) =>
      ['purchases', 'info'].includes(item.chapter)
    )
  }

  // Если пользователь не имеет coachData, исключаем определённые маршруты
  if (!userStore.user?.coachData) {
    return menuItems.value.filter(
      (item) => !['withdrawal', 'conditions'].includes(item.chapter)
    )
  }

  // Если пользователь имеет coachData – исключаем другие маршруты
  return menuItems.value.filter(
    (item) => !['messages', 'loyalty'].includes(item.chapter)
  )
})

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)
</script>

<template>
  <div class="menu">
    <div class="menu-header">
      <div
        v-if="userStore.user?.coachData || userStore.user?.userB2B"
        class="coach-block"
        :class="{
          'blue-bg': userStore.user?.coachData,
          'green-bg': userStore.user?.userB2B
        }"
      >
        <p v-if="userStore.user?.coachData">Mikki Партнер</p>
        <p v-if="userStore.user?.userB2B">B2B Store</p>
      </div>
      <div class="subtitle">
        Здравствуйте, <br v-if="!isMobile" />
        {{ userStore.user?.name ?? 'Пользователь' }}
      </div>
      <div class="email">{{ userStore.user?.email ?? 'email@mail.ru' }}</div>
    </div>
    <div class="menu-loyalty">
      <LoyaltyLevels
        v-if="!userStore.user?.userB2B"
        @menu-item-selected="handleLoyaltyLevelSelected"
      />
      <CoachPromocode v-if="userStore.user?.coachData" />
      <ManagerBlock v-if="userStore.user?.userB2B" />
    </div>
    <div class="menu-list">
      <div
        class="item"
        v-for="item in filteredMenuItems"
        :key="item.id"
        :class="{ active: route.query.chapter === item.chapter }"
        @click="setActive(item)"
      >
        <span class="item-title">{{ item.title }}</span>
        <span class="icon-right"><IconArrowRight /></span>
      </div>
    </div>
    <div class="menu-footer">
      <div class="item" @click="authStore.logout()">Выйти из аккаунта</div>
      <div class="item" @click="navigateTo('/')">Вернуться к покупкам</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'CabinetMenu';
</style>
