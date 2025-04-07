import axios from 'axios'

import type { Order } from '~/entities/order/model/Order'
import { useAuthStore } from '~/share/store/authStore'

export const getOrders = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.get<Order[]>(`${API}/api/user/orders`, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`
    }
  })
  return response.data
}

export const getPochtaTariff = async (
  mailIndex: number,
  products: { productId: number; quantity: number }[]
) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const token = authStore.accessToken

  if (!token) {
    throw new Error('Ошибка: пользователь не авторизован')
  }

  try {
    const requestData = {
      mailIndex: mailIndex,
      products: products
    }

    console.log('Запрос к API с данными:', requestData)

    const response = await axios.post(
      `${API}/api/delivery/pochta/tariff`,
      requestData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    console.log('Ответ от API:', response.data)
    return response.data
  } catch (error) {
    console.error('Ошибка при запросе тарифов:', error)
    throw error
  }
}

export const getYandexTariff = async (
  address: string | undefined,
  products: { productId: number; quantity: number }[]
) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const token = authStore.accessToken

  if (!token) {
    throw new Error('Ошибка: пользователь не авторизован')
  }

  try {
    const requestData = {
      address: address,
      products: products
    }

    console.log('Запрос к API с данными:', requestData)

    const response = await axios.post(
      `${API}/api/delivery/yandex/tariff`,
      requestData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    console.log('Ответ от API:', response.data)
    return response.data
  } catch (error) {
    console.error('Ошибка при запросе тарифов:', error)
    throw error
  }
}

export const getCdekTariff = async (
  mailIndex: number,
  products: { productId: number; quantity: number }[],
  addressTo: string
) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const token = authStore.accessToken

  if (!token) {
    throw new Error('Ошибка: пользователь не авторизован')
  }

  try {
    const requestData = {
      mailIndex: mailIndex,
      products: products,
      addressTo: addressTo
    }

    console.log('Запрос к API с данными:', requestData)

    const response = await axios.post(
      `${API}/api/delivery/cdek/tariff`,
      requestData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    console.log('Ответ от API:', response.data)
    return response.data
  } catch (error) {
    console.error('Ошибка при запросе тарифов:', error)
    throw error
  }
}

export const getBoxberryTariff = async (
  mailIndex: number,
  products: { productId: number; quantity: number }[]
) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const token = authStore.accessToken

  if (!token) {
    throw new Error('Ошибка: пользователь не авторизован')
  }

  try {
    const requestData = {
      mailIndex: mailIndex,
      products: products
    }

    console.log('Запрос к API с данными:', requestData)

    const response = await axios.post(
      `${API}/api/delivery/boxberry/tariff`,
      requestData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    console.log('Ответ от API:', response.data)
    return response.data
  } catch (error) {
    console.error('Ошибка при запросе тарифов:', error)
    throw error
  }
}

export const postOrderB2B = async (orderData: {
  name: string
  surname: string
  email: string
  phone: string
  comment: string
  products: {
    productId: number
    quantity: number
    size: string
  }[]
  paymentType: string
  paymentTypeVariants: string
  deliveryService: string
  deliveryServiceVariants: string
  deliveryType: string
  address: string
}) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const token = authStore.accessToken

  if (!token) {
    throw new Error('Ошибка: пользователь не авторизован')
  }

  try {
    const response = await axios.post(`${API}/api/order_b2_bs`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('Заказ успешно отправлен:', response.data)
    return response.data
  } catch (error) {
    console.error('Ошибка при создании заказа B2B:', error)
    throw error
  }
}
