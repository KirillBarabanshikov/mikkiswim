import axios from 'axios'

import type {
  Withdrawal,
  WithdrawalRequest
} from '~/entities/withdrawal/model/Withdrawal'
import { useAuthStore } from '~/share/store/authStore'

export const getWithdrawals = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.get<Withdrawal[]>(
    `${API}/api/user_coach_payment_requests`,
    {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    }
  )
  console.log(response.data)
  return response.data
}

export const addWithdrawals = async (data: WithdrawalRequest) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()

  try {
    const response = await axios.post<WithdrawalRequest>(
      `${API}/api/coach/request_payment`,
      data,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      }
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Ошибка при отправке запроса на вывод средств:', error)
    throw error
  }
}
