<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import * as yup from 'yup'

import type { Cart } from '~/entities/cart/model/Cart'
import { useProductsSizes } from '~/entities/product/api/query'
import type { Product } from '~/entities/product/model/Product'
import CartNotifier from '~/features/CartNotifier/CartNotifier.vue'
import CartNotifierRemove from '~/features/CartNotifierRemove/CartNotifierRemove.vue'
import FavoriteIcon from '~/features/FavoriteIcon/FavoriteIcon.vue'
import ProductDeliveryDialog from '~/features/ProductDeliveryDialog/ProductDeliveryDialog.vue'
import ProductPaymentDialog from '~/features/ProductPaymentDialog/ProductPaymentDialog.vue'
import SwimsuitSizeDialog from '~/features/SwimsuitSizeDialog/SwimsuitSizeDialog.vue'
import SizeSubscribeToggle from '~/share/components/favorite/SizeSubscribeToggle/SizeSubscribeToggle.vue'
import { useAuthStore } from '~/share/store/authStore'
import { useCartStore } from '~/share/store/cartStore'
import { useGlobalStore } from '~/share/store/globalStore'
import IconRuler from '~/share/UI/Icons/IconRuler.vue'
import IconView from '~/share/UI/Icons/IconView.vue'
import type { ToggleItem } from '~/share/UI/ToggleGroup/types'
import { useFormatPrice } from '~/share/utils/useFormatPrice'

const props = defineProps<{ product: Product }>()

const globalStore = useGlobalStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const {
  mutate: sendProductSizes,
  isPending: isSizePending,
  isSuccess: isSizeSendSuccess,
  isError: isSizeSendError
} = useProductsSizes()

const { value: emailValue } = useField('email')

const selectedSize = ref<ToggleItem | null>(null)
const selectedCount = ref<number>(1)
const isAddedToCart = ref<boolean>(false)
const isRemovedFromCart = ref<boolean>(false)
let isAddedToCartTimeout: ReturnType<typeof setTimeout>
let isRemovedFromCartTimeout: ReturnType<typeof setTimeout>

const isSizeDialogOpen = ref(false)
const isDeliveryDialogOpen = ref(false)
const isPaymentDialogOpen = ref(false)

const currentCartProduct = ref<Cart | null>(null)

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Заполнить обязательно')
})

const { handleSubmit } = useForm({
  validationSchema
})

const onSubmitSuccess = () => {
  if (selectedSize.value && emailValue.value) {
    const formatedModel = {
      sizesId: selectedSize.value.id as number,
      email: emailValue.value as string
    }
    sendProductSizes(formatedModel)
  }
}

const onSubmit = handleSubmit(onSubmitSuccess)

const toggleSize = (b: boolean) => {
  if (typeof b === 'undefined') isSizeDialogOpen.value = !isSizeDialogOpen.value
  else isSizeDialogOpen.value = b
}

const toggleDelivery = (b: boolean) => {
  if (typeof b === 'undefined')
    isDeliveryDialogOpen.value = !isDeliveryDialogOpen.value
  else isDeliveryDialogOpen.value = b
}

const togglePayment = (b: boolean) => {
  if (typeof b === 'undefined')
    isPaymentDialogOpen.value = !isPaymentDialogOpen.value
  else isPaymentDialogOpen.value = b
}

const formattedSizes = computed<ToggleItem[]>(() =>
  props.product.sizes.map((size) => ({
    id: size.id,
    content: size.title,
    value: size.title,
    subscribe: false,
    quantity: size.quantity
  }))
)

const hasStock = computed(() => selectedSize.value?.quantity ?? 0 > 0)
const cartStatus = computed(() => {
  const isInCart = cartStore.items?.some(
    (item: Cart) =>
      item.size === selectedSize.value?.value &&
      item.product.id === props.product.id
  )

  const cartItem = cartStore.items?.find(
    (item: Cart) =>
      item.size === selectedSize.value?.value &&
      item.product.id === props.product.id
  )

  if (!isInCart) return 'В корзину'
  if (cartItem?.quantity === selectedCount.value)
    return `В корзине ${selectedCount.value} шт.`
  if (selectedCount.value === 0 && isInCart) return 'Удалить из корзины'
  return `В корзину ${selectedCount.value} шт.`
})

const handleAddToCart = async () => {
  if (!authStore.isAuthenticated) {
    globalStore.toggleIsOpenAuthentication(true)
  } else {
    if (!selectedSize.value) return

    const isInCart = cartStore.items.some(
      (item: Cart) =>
        item.size === selectedSize.value?.value &&
        item.product.id === props.product.id
    )

    const productData = {
      combinationId: 0,
      productId: props.product.id,
      size: selectedSize.value.content,
      quantity: selectedCount.value || 1
    }

    if (selectedCount.value === 0 && isInCart) {
      await cartStore.removeProductFromCart(productData)
      isRemovedFromCart.value = true
      isRemovedFromCartTimeout = setTimeout(() => {
        isRemovedFromCart.value = false
        selectedSize.value = null
      }, 5000)
    } else {
      await cartStore.addProductToCart(productData)
      isAddedToCart.value = true
      isAddedToCartTimeout = setTimeout(() => {
        isAddedToCart.value = false
      }, 5000)
    }
  }
}

const closeNotifier = () => {
  isAddedToCart.value = false
  clearTimeout(isAddedToCartTimeout)
}
const closeNotifierRemove = () => {
  isRemovedFromCart.value = false
  clearTimeout(isRemovedFromCartTimeout)
  selectedSize.value = null
}

watch(cartStore, (val) => {
  currentCartProduct.value = val.items.find(
    (item: Cart) => item.product.id === props.product.id
  )
  if (currentCartProduct.value !== null) {
    selectedSize.value = formattedSizes.value.find(
      (size) => size.value === currentCartProduct.value?.size
    ) as ToggleItem
    if (selectedSize.value) {
      selectedCount.value = currentCartProduct.value.quantity
    }
  }
})
</script>

<template>
  <div class="catalog-info">
    <div class="catalog-info-content">
      <div v-if="product.tags?.length" class="catalog-badges">
        <Badge v-for="tag in product.tags" :key="tag.id" :variant="tag.color">
          {{ tag.title }}
        </Badge>
      </div>

      <h1 class="catalog-title">
        {{ product.title }}
      </h1>

      <div class="catalog-flex">
        <div class="catalog-price">
          <div v-if="product.oldPrice" class="catalog-price-old">
            {{ useFormatPrice(product.oldPrice) }} ₽
          </div>
          <div v-if="product.price" class="catalog-price-current">
            {{ useFormatPrice(product.price) }} ₽
          </div>
        </div>
        <div class="catalog-views">
          <IconView />
          <span>{{ product.viewers }}</span>
        </div>
      </div>

      <div class="catalog-sizes">
        <div class="catalog-label">Выберите размер</div>
        <div class="catalog-group">
          <SizeSubscribeToggle
            v-model="selectedSize"
            :list="formattedSizes"
            class="sizes"
            name="sizes"
          />
        </div>
      </div>

      <Transition name="slide">
        <form
          v-if="selectedSize?.quantity === 0"
          class="catalog-email"
          @submit.prevent="onSubmit"
        >
          <span>Укажите почту и мы уведомим вас о поступлении товара</span>
          <Input
            v-model="emailValue"
            name="email"
            placeholder="Укажите почту"
          />
          <Button type="submit">Сообщить о поступлении</Button>
        </form>
      </Transition>

      <Transition name="slide">
        <div
          v-if="isSizeSendSuccess || isSizeSendError"
          :class="[
            'catalog-response',
            { success: isSizeSendSuccess },
            { error: isSizeSendError }
          ]"
        >
          <div class="catalog-response-title">
            <IconSuccess />
            <span>{{ isSizeSendSuccess ? 'Успешно' : 'Ошибка' }}</span>
          </div>
          <div class="catalog-response-body">
            {{
              isSizeSendSuccess
                ? 'Как только товар появится у нас мы вам сообщим'
                : 'Произошла ошибка'
            }}
          </div>
        </div>
      </Transition>

      <div class="catalog-ruler" @click="toggleSize(true)">
        <IconRuler />
        <span>Помощь с размерами</span>
      </div>

      <div class="catalog-actions">
        <Button
          variant="black"
          class="catalog-cart"
          :disabled="selectedSize === null || !hasStock"
          @click="handleAddToCart"
        >
          {{ cartStatus }}
        </Button>

        <template v-if="hasStock && authStore.isAuthenticated">
          <Counter v-model="selectedCount" :max="selectedSize?.quantity" />
        </template>

        <FavoriteIcon :product="product" />
      </div>

      <Collapsible
        title="Товар на маркетплейсах"
        :product="product"
      ></Collapsible>
    </div>

    <div class="catalog-btns">
      <SwimsuitSizeDialog v-if="isSizeDialogOpen" @close="toggleSize(false)" />
      <div class="btn-open" @click="toggleDelivery(true)">Доставка</div>
      <ProductDeliveryDialog
        :product="product"
        v-if="isDeliveryDialogOpen"
        @close="toggleDelivery(false)"
      />
      <div class="btn-open" @click="togglePayment(true)">Оплата</div>
      <ProductPaymentDialog
        :product="product"
        v-if="isPaymentDialogOpen"
        @close="togglePayment(false)"
      />
    </div>

    <Teleport to="body">
      <Transition name="notifier-top">
        <CartNotifier
          v-if="isAddedToCart"
          :product="product"
          :size="selectedSize?.value"
          :quantity="selectedCount"
          @close="closeNotifier"
        />
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="notifier-top">
        <CartNotifierRemove
          v-if="isRemovedFromCart"
          :product="product"
          :size="selectedSize?.value"
          @close="closeNotifierRemove"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@use 'ProductInfo';
</style>
