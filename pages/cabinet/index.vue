<script setup lang="ts">
import CabinetCertificates from '~/share/components/cabinet/CabinetCertificates/CabinetCertificates.vue'
import CabinetConditions from '~/share/components/cabinet/CabinetConditions/CabinetConditions.vue'
import CabinetInfo from '~/share/components/cabinet/CabinetInfo/CabinetInfo.vue'
import CabinetLoyalty from '~/share/components/cabinet/CabinetLoyalty/CabinetLoyalty.vue'
import CabinetMenu from '~/share/components/cabinet/CabinetMenu/CabinetMenu.vue'
import { menuItems } from '~/share/components/cabinet/CabinetMenu/model/model'
import CabinetMessages from '~/share/components/cabinet/CabinetMessages/CabinetMessages.vue'
import CabinetPurchases from '~/share/components/cabinet/CabinetPurchases/CabinetPurchases.vue'
import CabinetRefunds from '~/share/components/cabinet/CabinetRefunds/CabinetRefunds.vue'
import CabinetReviews from '~/share/components/cabinet/CabinetReviews/CabinetReviews.vue'
import CabinetWithdrawal from '~/share/components/cabinet/CabinetWithdrawal/CabinetWithdrawal.vue'
import CoachPromocode from '~/share/components/cabinet/CoachPromocode/CoachPromocode.vue'
import LoyaltyLevels from '~/share/components/cabinet/LoyaltyLevels/LoyaltyLevels.vue'
import SuccessCertficateBlock from '~/share/components/cabinet/SuccessCertificateBlock/SuccessCertificateBlock.vue'
import { useUserStore } from '~/share/store/userStore'
import ManagerBlock from '~/share/components/cabinet/ManagerBlock/ManagerBlock.vue'
import CabinetPurchasesB2B from '~/share/components/cabinet/CabinetPurchasesB2B/CabinetPurchasesB2B.vue'

const userStore = useUserStore()

const route = useRoute()

definePageMeta({
  middleware: ['auth'],
  requiresAuth: true,
  ssr: false
})

const currentChapter = computed(() => route.query.chapter)
const refundsActiveView = ref<'cards' | 'info'>('cards')
const withdrawalActiveView = ref<'cards' | 'info'>('cards')

const handleRefundRequest = () => {
  refundsActiveView.value = 'info'
  navigateTo({ query: { chapter: 'refunds' } })
}

const isShowSuccessCertificateBlock = ref(false)
const successPrice = ref<number | null>(null)

const showSuccessCertificateBlock = (price: number) => {
  successPrice.value = price
  isShowSuccessCertificateBlock.value = true

  setTimeout(() => {
    isShowSuccessCertificateBlock.value = false
    successPrice.value = null
  }, 3000)
}

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)

const isMobileMenuOpen = ref(true)

const selectMenuItem = (chapter: string) => {
  navigateTo({ query: { chapter } })
  if (isMobile.value) {
    isMobileMenuOpen.value = false
  }
}

const goBackToMenu = () => {
  isMobileMenuOpen.value = true
}
const chapterKey = computed((): string => {
  const chapter = route.query.chapter
  if (Array.isArray(chapter)) {
    return chapter[0]
  }
  return chapter ?? 'purchases'
})

const currentMenuTitle = computed(() => {
  const menuItem = menuItems.value.find(
    (item) => item.chapter === chapterKey.value
  )
  return menuItem ? menuItem.title : 'Назад'
})
</script>

<template>
  <client-only>
    <div class="page">
      <div class="page-content container">
        <template v-if="!isMobile">
          <CabinetMenu @menu-item-selected="selectMenuItem" />
          <section class="content">
            <component
              :is="
                {
                  purchases: !userStore.user?.userB2B
                    ? CabinetPurchases
                    : CabinetPurchasesB2B,
                  refunds: CabinetRefunds,
                  info: CabinetInfo,
                  reviews: CabinetReviews,
                  activeCertificate: CabinetCertificates,
                  loyalty: CabinetLoyalty,
                  messages: CabinetMessages,
                  withdrawal: CabinetWithdrawal,
                  conditions: CabinetConditions
                }[chapterKey]
              "
              v-bind="{
                initialActiveView:
                  chapterKey === 'refunds'
                    ? refundsActiveView
                    : chapterKey === 'withdrawal'
                      ? withdrawalActiveView
                      : 'purchases'
              }"
              @refund-request="handleRefundRequest"
              @success-activation="showSuccessCertificateBlock"
            />
          </section>

          <div class="loyalty-content">
            <ManagerBlock v-if="userStore.user?.userB2B" />
            <LoyaltyLevels v-if="!userStore.user?.userB2B" />
            <CoachPromocode
              v-if="!userStore.user?.userB2B && userStore.user?.coachData"
            />
            <Transition name="fade">
              <SuccessCertficateBlock
                v-if="isShowSuccessCertificateBlock"
                :price="successPrice"
              />
            </Transition>
          </div>
        </template>

        <template v-else>
          <div v-if="isMobileMenuOpen" class="mobile-menu">
            <CabinetMenu @menu-item-selected="selectMenuItem" />
          </div>
          <div v-else class="mobile-content">
            <button class="back-button" @click="goBackToMenu">
              <IconArrowLeft />
              {{ currentMenuTitle }}
            </button>
            <section class="content">
              <component
                :is="
                  {
                    purchases: !userStore.user?.userB2B
                      ? CabinetPurchases
                      : CabinetPurchasesB2B,
                    refunds: CabinetRefunds,
                    info: CabinetInfo,
                    reviews: CabinetReviews,
                    activeCertificate: CabinetCertificates,
                    loyalty: CabinetLoyalty,
                    messages: CabinetMessages,
                    withdrawal: CabinetWithdrawal,
                    conditions: CabinetConditions
                  }[chapterKey]
                "
                v-bind="{
                  initialActiveView:
                    chapterKey === 'refunds'
                      ? refundsActiveView
                      : chapterKey === 'withdrawal'
                        ? withdrawalActiveView
                        : 'purchases'
                }"
                @refund-request="handleRefundRequest"
                @success-activation="showSuccessCertificateBlock"
              />
            </section>
            <div class="loyalty-content">
              <LoyaltyLevels @menu-item-selected="selectMenuItem" />
              <CoachPromocode v-if="userStore.user?.coachData" />
              <Transition name="fade">
                <SuccessCertficateBlock
                  v-if="isShowSuccessCertificateBlock"
                  :price="successPrice"
                />
              </Transition>
            </div>
          </div>
        </template>
      </div>
    </div>
  </client-only>
</template>

<style scoped lang="scss">
@use 'Cabinet';
</style>
