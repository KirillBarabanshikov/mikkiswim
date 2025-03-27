import axios from 'axios'

import { useAuthStore } from '~/share/store/authStore'

export const getCart = async () => {
  const authStore = useAuthStore()

  const {
    public: { API }
  } = useRuntimeConfig()

  if (authStore.isAuthenticated) {
    const response = await axios.get(`${API}/api/user/cart`, {
      headers: { Authorization: `Bearer ${authStore.accessToken}` }
    })

    return response.data
  }
}

export const addToCart = async (product: {
  productId: number
  size?: string
  quantity: number
}) => {
  const authStore = useAuthStore()
  const token = authStore.accessToken

  if (!token) {
    throw new Error('Ошибка: пользователь не авторизован')
  }

  const {
    public: { API }
  } = useRuntimeConfig()

  console.log('Отправляемые данные в корзину:', product)

  const response = await axios.post(`${API}/api/cart/add`, product, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return response.data
}

export const removeFromCart = async (product: {
  productId: number
  size?: string
}) => {
  const authStore = useAuthStore()
  const token = authStore.accessToken

  if (!token) {
    throw new Error('Ошибка: пользователь не авторизован')
  }

  const {
    public: { API }
  } = useRuntimeConfig()

  console.log('Отправляемые данные в корзину:', product)

  const response = await axios.post(`${API}/api/cart/remove`, product, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return response.data
}
