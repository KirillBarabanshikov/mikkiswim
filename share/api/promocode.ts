import axios from 'axios'

import { useAuthStore } from '~/share/store/authStore'

export const getPromocode = async (promocode: string) => {
  if (!promocode) return null

  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()

  try {
    const response = await axios.get(`${API}/api/promo_codes`, {
      params: { promoCode: promocode },
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching promocode:', error)
    throw error
  }
}
