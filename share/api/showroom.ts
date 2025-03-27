import axios from 'axios'

import type { FormSchemeData } from '~/features/ShowRoomPopup/types'
import { useAuthStore } from '~/share/store/authStore'

export const addShowroom = async (formData: FormSchemeData) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(
      `${API}/api/showroom_appointments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      }
    )
    return response.data
  } catch (error) {
    throw error
  }
}
