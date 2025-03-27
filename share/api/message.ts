import axios from 'axios'

import type { Message } from '~/entities/message/model/Message'
import { useAuthStore } from '~/share/store/authStore'

export const getMessages = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.get<Message[]>(`${API}/api/user/messages`, {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`
    }
  })
  console.log(response.data)
  return response.data
}
