<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useProductsSizes } from '~/entities/product/api/query'
import type { Product, ProductSizes } from '~/entities/product/model/Product'
import SubscribeSize from '~/share/components/favorite/FavoriteCard/CardHover/SubscribeSize.vue'
import SizeSubscribeToggle from '~/share/components/favorite/SizeSubscribeToggle/SizeSubscribeToggle.vue'
import { useCartStore } from '~/share/store/cartStore'
import { useGlobalStore } from '~/share/store/globalStore'
import { useUserStore } from '~/share/store/userStore'
import type { ToggleItem } from '~/share/UI/ToggleGroup/types'

const props = defineProps<{
  sizes: ProductSizes[]
  product: Product
}>()

const { mutate: sendProductSizes, isPending: isSendProductSizes } =
  useProductsSizes()

const userStore = useUserStore()
const globalStore = useGlobalStore()
const cartStore = useCartStore()

const list = ref(props.sizes)

const activeSize = ref<ToggleItem>({} as ToggleItem)

const toggleSizes = computed<ToggleItem[]>(() =>
  props.sizes.map((size) => ({
    id: size.id,
    value: size.title,
    content: size.title,
    quantity: size.quantity
  }))
)

watch(
  () => props.sizes,
  (newSizes) => {
    list.value = newSizes
  },
  { deep: true }
)

const onUpdateSizes = (value: ToggleItem) => {
  activeSize.value = Array.isArray(value) ? value[0] : value
}

const onSendSubscribeEmailSizes = (email: string) => {
  const formatedModel = {
    sizesId: activeSize.value.id as number,
    email: email
  }
  sendProductSizes(formatedModel)
  activeSize.value = {} as ToggleItem
}

const addToCart = () => {
  const formatedModel = {
    size: activeSize.value,
    productId: props.product.id
  }
  cartStore.addProductToCart(formatedModel)
}
</script>

<template>
  <section class="card-hover">
    <div class="background"></div>
    <div class="choice">
      <h4>Выберите размер</h4>

      <SizeSubscribeToggle
        v-model="activeSize"
        :list="toggleSizes"
        class="sizes"
        name="sizes"
        @update:model-value="onUpdateSizes"
      />

      <SubscribeSize
        v-if="activeSize && activeSize.quantity === 0 && userStore.user"
        @on-subscribe="onSendSubscribeEmailSizes"
      />

      <div
        v-if="activeSize && activeSize.quantity > 0 && userStore.user"
        class="basket"
      >
        <Button @click="addToCart">Добавить в корзину</Button>
      </div>

      <div v-if="activeSize && !userStore.user" class="basket">
        <Button @click="globalStore.toggleIsOpenAuthentication(true)"
          >Войти в аккаунт</Button
        >
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.card-hover {
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  transition: all 0.3s ease;
  bottom: -100%;

  &.hover {
    bottom: 0;
  }
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--white);
  opacity: 0.9;
}

.choice {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 36px 10px;
}

.sizes {
  padding: 10px;
  display: flex;
  flex: 1 0 50px;
}

.basket {
  display: flex;
  justify-content: center;
  width: 100%;
}

@media (max-width: $md1 + px) {
  .card-hover {
    width: 100%;
    height: 90%;
  }
}

@media (max-width: $md2 + px) {
  .card-hover {
    width: 100%;
    height: 100%;
  }
  .choice {
    padding: 20px 10px;
  }
  .btn-black {
    max-width: 200px;
    font-size: 12px;
  }
}
</style>
