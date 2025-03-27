import axios from 'axios'

import type { b2bData, managerInfo } from '~/entities/user-b2b/model/User-b2b'
import type { FormScheme } from '~/features/B2BRegisterForm/types'
import { useAuthStore } from '~/share/store/authStore'

export const registerB2B = async (data: FormScheme) => {
  const {
    public: { API }
  } = useRuntimeConfig()

  try {
    const response = await axios.post(
      `${API}/api/b2b_client/register`,
      data,
      {}
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching look products:', error)
    throw error
  }
}

export const getManager = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.get<managerInfo>(
    `${API}/api/b2b_client/manager`,
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    }
  )
  console.log(response.data)
  return response.data
}

export const changePersonalB2BInfo = async (data: b2bData) => {
  const {
    public: { API }
  } = useRuntimeConfig()

  const authStore = useAuthStore()

  const response = await axios.post(`${API}/api/b2b_client/edit`, data, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`
    }
  })

  return response.data
}
