<script setup lang="ts">
import { mockCatalog } from 'public/moks/mockCatalog'
import { useRouter } from 'vue-router'

import LikeCard from '~/widgets/Search/components/LikeCard/LikeCard.vue'

type MEmits = {
  (eventName: 'onRoute'): void
}

const emits = defineEmits<MEmits>()
const router = useRouter()

const onTargetCard = (slug: string) => {
  router.push(`/product/${slug}`)
  emits('onRoute')
}
</script>

<template>
  <section class="maybe">
    <strong>Возможно, вам понравится</strong>
    <div class="list">
      <LikeCard
        v-for="product in mockCatalog"
        :key="product.id"
        :product="product"
        @on-target="onTargetCard"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'MaybeLike';
</style>
