//@ts-ignore

import axios from 'axios'
import { ref } from 'vue'

import type { Cart } from '~/entities/cart/model/Cart'
import { addToCart, getCart, removeFromCart } from '~/share/api/cart'
import { useAuthStore } from '~/share/store/authStore'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Cart[]>([])

  const fetchCart = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      items.value = await getCart()
      console.log(items.value)
    } catch (error) {
      throw error
    }
  }

  const addProductToCart = async ({
    productId,
    size,
    quantity
  }: {
    productId: number
    size: string
    quantity: number
  }) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken

    if (!token) {
      return
    }

    // eslint-disable-next-line no-useless-catch
    try {
      await addToCart({ productId, size, quantity })
      await fetchCart()
    } catch (error) {
      throw error
    }
  }

  const removeProductFromCart = async ({
    productId,
    size
  }: {
    productId: number
    size: string
  }) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken

    if (!token) {
      return
    }

    // eslint-disable-next-line no-useless-catch
    try {
      await removeFromCart({ productId, size })
      await fetchCart()
    } catch (error) {
      throw error
    }
  }

  return {
    items,
    fetchCart,
    addProductToCart,
    removeProductFromCart
  }
})
