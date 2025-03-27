import axios from 'axios'

import type { Product } from '~/entities/product/model/Product'
import { useAuthStore } from '~/share/store/authStore'

export const addReview = async (formData: FormData) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()

  try {
    const response = await axios.post(`${API}/api/reviews/add`, formData, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching look products:', error)
    throw error
  }
}

export const getReview = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()

  if (authStore.isAuthenticated) {
    const response = await axios.get(`${API}/api/user/reviews`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    })
    return response.data
  } else return []
}

export const editReview = async ({
  formData,
  id
}: {
  formData: FormData
  id: number
}) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()

  try {
    const response = await axios.post(
      `${API}/api/reviews/edit/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching look products:', error)
    throw error
  }
}

export const removeReview = async (id: number) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()

  try {
    const response = await axios.delete(`${API}/api/reviews/remove/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting review:', error)
    throw error
  }
}
