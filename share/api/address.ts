import axios from 'axios'

import { useAuthStore } from '~/share/store/authStore'

export const getAddressSuggestions = async (query: string) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const token = authStore.accessToken

  if (!token) {
    throw new Error('Ошибка: пользователь не авторизован')
  }

  try {
    console.log('Запрос к API с параметром:', query)

    const response = await axios.post(
      `${API}/api/delivery/address_suggest`,
      { query },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    console.log('Ответ от API:', response.data)
    return response.data.suggestions
  } catch (error) {
    console.error('Ошибка при запросе подсказок адреса:', error)
    throw error
  }
}
