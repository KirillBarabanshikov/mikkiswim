import axios from 'axios'

import type { Order } from '~/entities/order/model/Order'
import { useAuthStore } from '~/share/store/authStore'

export const registerPartner = async (formData: FormData) => {
  const {
    public: { API }
  } = useRuntimeConfig()

  try {
    const response = await axios.post(`${API}/api/coach/register`, formData, {})
    return response.data.data
  } catch (error) {
    console.error('Error fetching look products:', error)
    throw error
  }
}
export const getPartnerOrders = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.get<Order[]>(`${API}/api/coach/orders`, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`
    }
  })
  console.log(response.data)
  return response.data
}
