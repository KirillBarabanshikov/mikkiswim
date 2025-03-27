import axios from 'axios'

import { useAuthStore } from '~/share/store/authStore'

export const addWishes = async (productId: number) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.post(
    `${API}/api/wish/add`,
    { productId: productId },
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    }
  )
  return response.data
}

export const addWishesByIds = async (ids: Set<number>) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()

  // Преобразуем Set<number> в строку
  const idsString = [...ids].join(',')

  const response = await axios.post(
    `${API}/api/wish/ids`,
    { ids: idsString }, // Передаем строку
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    }
  )

  localStorage.setItem('favorite_products', '')
  return response.data
}

export const removeWishes = async (productId: number) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.post(
    `${API}/api/wish/remove`,
    { productId: productId },
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    }
  )
  return response.data
}
