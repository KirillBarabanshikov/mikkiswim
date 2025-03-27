<script setup lang="ts">
import { ref, watch } from 'vue'

import { useOrders } from '~/entities/order/api/query'
import type { Product } from '~/entities/order/model/Order'
import { usePartnerOrders } from '~/entities/user-partner/api/query'
import PurchaseCard from '~/features/PurchaseCard/PurchaseCard.vue'
import PurchaseListByPromo from '~/features/PurchaseListByPromo/PurchaseListByPromo.vue'
import SelectProductForReview from '~/features/SelectProductForReview/SelectProductForReview.vue'
import { useUserStore } from '~/share/store/userStore'
import ReviewDialog from '~/widgets/Reviews/components/ReviewDialog/ReviewDialog.vue'

const userStore = useUserStore()
const emit = defineEmits<{ (e: 'refund-request'): void }>()

const props = defineProps({
  initialActiveView: {
    type: String as () => 'purchases' | 'by-promo',
    default: 'purchases'
  }
})

const { data: orders, isPending } = useOrders()

const activeView = ref<'purchases' | 'by-promo'>(props.initialActiveView)

watch(
  () => props.initialActiveView,
  (newVal) => {
    activeView.value = newVal
  }
)

const validOrders = computed(
  () => orders.value?.filter((order) => order.products.length > 0) || []
)

const selectedOrderId = ref<number | null>(null)

const toggleView = (view: 'purchases' | 'by-promo') => {
  activeView.value = view
}

const isOpenReview = ref(false)
const toggleOpenReview = (orderId: number) => {
  if (selectedOrderId.value === orderId) {
    selectedOrderId.value = null
  } else {
    selectedOrderId.value = orderId
  }
}

const selectedReviewProduct = ref<Product | null>(null)
const isReviewDialogOpen = ref(false)

const openReviewDialog = (product: Product) => {
  selectedReviewProduct.value = product
  isReviewDialogOpen.value = true
  console.log(selectedReviewProduct.value)
}

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)

watch(selectedOrderId, (newVal) => {
  if (newVal !== null) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <section class="purchases">
    <div class="purchases-container">
      <div v-if="userStore.user?.coachData" class="purchases-toggle">
        <p>Покупки</p>
        <div class="toggle-actions">
          <Button
            smallest
            :color="activeView === 'purchases' ? 'black' : 'white'"
            @click="toggleView('purchases')"
          >
            Личные
          </Button>
          <Button
            smallest
            :color="activeView === 'by-promo' ? 'black' : 'white'"
            @click="toggleView('by-promo')"
          >
            По промо-коду
          </Button>
        </div>
      </div>

      <div v-if="isPending">
        <div v-if="!isMobile" class="list">
          <template v-for="i in 3" :key="i">
            <Skeleton width="850px" height="200px" />
          </template>
        </div>
        <div v-else class="list">
          <template v-for="i in 3" :key="i">
            <Skeleton width="360px" height="210px" />
          </template>
        </div>
      </div>

      <div v-else class="content-wrapper">
        <transition name="slide" mode="out-in">
          <div v-if="orders?.length === 0" class="zero-block" key="empty">
            У вас нет недавно <br />
            совершенных заказов
            <Button @click="navigateTo('/')">Купить сейчас!</Button>
          </div>

          <div v-else key="content">
            <transition name="slide" mode="out-in">
              <div v-if="activeView === 'purchases'" key="purchases">
                <div class="list">
                  <template v-for="order in validOrders" :key="order.id">
                    <PurchaseCard
                      v-if="order.products.length > 0"
                      :order="order"
                      @refund-request="$emit('refund-request')"
                      @open-review="() => toggleOpenReview(order.id)"
                    />
                    <Transition name="fade">
                      <SelectProductForReview
                        v-if="selectedOrderId === order.id"
                        :products="order.products"
                        @select="openReviewDialog"
                        @close="selectedOrderId = null"
                      />
                    </Transition>
                  </template>
                  <Transition name="fade">
                    <ReviewDialog
                      v-if="isReviewDialogOpen"
                      :product="selectedReviewProduct"
                      :is-open="isReviewDialogOpen"
                      @update:is-open="(val) => (isReviewDialogOpen = val)"
                    />
                  </Transition>
                </div>
              </div>

              <PurchaseListByPromo v-else key="by-promo" />
            </transition>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'CabinetPurchases';
</style>
