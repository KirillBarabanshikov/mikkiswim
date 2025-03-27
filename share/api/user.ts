import axios from 'axios'

import type { Product } from '~/entities/product/model/Product'
import { useAuthStore } from '~/share/store/authStore'

export const changeEmail = async (data: {
  email: string
  emailConfirmation: string
}) => {
  const {
    public: { API }
  } = useRuntimeConfig()

  const authStore = useAuthStore()

  const response = await axios.post(`${API}/api/users/edit_email`, data, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`
    }
  })

  return response.data
}
export const changePassword = async (data: {
  password: string
  passwordConfirmation: string
}) => {
  const {
    public: { API }
  } = useRuntimeConfig()

  const authStore = useAuthStore()

  const response = await axios.post(`${API}/api/users/edit_password`, data, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`
    }
  })

  return response.data
}

export const changePersonalInfo = async (data: any) => {
  const {
    public: { API }
  } = useRuntimeConfig()

  const authStore = useAuthStore()

  const response = await axios.patch(`${API}/api/users/change`, data, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`
    }
  })

  return response.data
}

export const getWishes = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.get<Product[]>(`${API}/api/user/wishes`, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`
    }
  })
  return response.data
}

export const recoverPassword = async (email: string) => {
  const {
    public: { API }
  } = useRuntimeConfig()

  const response = await axios.post(`${API}/api/recover`, { email })

  return response.data
}

export const checkRecoveryLink = async (token: string, email: string) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const response = await axios.get(`${API}/api/recover/check`, {
    params: { token, email }
  })
  return response.data
}

export const resetPassword = async (data: {
  token: string
  email: string
  password: string
}) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${API}/api/recover/use`, data)
    return response.data
  } catch (error: any) {
    throw error
  }
}
