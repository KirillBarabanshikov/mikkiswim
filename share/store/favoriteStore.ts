//@ts-ignore

import { onMounted, ref } from 'vue'

import type { Product } from '~/entities/product/model/Product'
import { addWishes, removeWishes } from '~/entities/wish/api/query'
import { getProductsByIds } from '~/share/api/product'
import { getWishes } from '~/share/api/user'
import { useUserStore } from '~/share/store/userStore'

const FAVORITES_KEY = 'favorite_products'

export const useFavoriteStore = defineStore('favoriteStore', () => {
  const userStore = useUserStore()

  const favorites = ref<Set<number>>(new Set())
  const favoriteProducts = ref<Product[]>([])

  const loadFavorites = async () => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY)
    if (storedFavorites) {
      favorites.value = new Set(JSON.parse(storedFavorites))
    }
    await fetchFavoriteProducts()
  }

  const fetchFavoriteProducts = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (!userStore.user) {
        if (favorites.value.size > 0)
          favoriteProducts.value = await getProductsByIds([...favorites.value])
      } else {
        favoriteProducts.value = await getWishes()
      }
    } catch (error) {
      throw error
    }
  }

  const saveFavorites = () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites.value]))
  }

  const addToFavorites = async (productId: number) => {
    if (userStore.user) {
      try {
        await addWishes(productId)
      } catch (error) {
        return
      }
    }

    favorites.value.add(productId)
    saveFavorites()
    await fetchFavoriteProducts()
  }

  const removeFromFavorites = async (productId: number) => {
    if (userStore.user) {
      try {
        await removeWishes(productId)
      } catch (error) {
        return
      }
    }

    favorites.value.delete(productId)
    saveFavorites()
    await fetchFavoriteProducts()
  }

  const toggleFavorite = async (productId: number) => {
    if (userStore.user) {
      if (favoriteProducts.value.some((item) => item.id === productId)) {
        await removeFromFavorites(productId)
      } else {
        await addToFavorites(productId)
      }
    } else {
      if (favorites.value.has(productId)) {
        await removeFromFavorites(productId)
      } else {
        await addToFavorites(productId)
      }
    }
  }

  const isFavorite = (productId: number) => {
    if (!userStore.user) {
      return favorites.value.has(productId)
    } else {
      return favoriteProducts.value.some((item) => item.id === productId)
    }
  }

  return {
    favorites,
    favoriteProducts,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    loadFavorites
  }
})
