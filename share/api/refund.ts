import axios from 'axios'

import type { Refund } from '~/entities/refund/model/Refund'
import { useAuthStore } from '~/share/store/authStore'

export const getRefunds = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.get<Refund[]>(`${API}/api/user/refunds`, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`
    }
  })
  console.log(response.data)
  return response.data
}

export const addRefund = async (formData: any) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()

  try {
    const response = await axios.post(`${API}/api/refund`, formData, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching look products:', error)
    throw error
  }
}
