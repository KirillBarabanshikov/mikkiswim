import axios from 'axios'
import { useAuthStore } from '~/share/store/authStore'

export const login = async (
  username: string,
  password: string,
  apiUrl: string
) => {
  const response = await axios.post(`${apiUrl}/api/authentication_token`, {
    username,
    password
  })
  return response.data
}

export const refreshToken = async (refreshToken: string, apiUrl: string) => {
  const response = await axios.post(`${apiUrl}/api/refresh_token`, {
    // eslint-disable-next-line camelcase
    refresh_token: refreshToken
  })
  return response.data
}

export const register = async (
  username: string,
  password: string,
  email: string | undefined,
  apiUrl: string
) => {
  const response = await axios.post(`${apiUrl}/api/register`, {
    email,
    password,
    username
  })
  return response.data
}

export const fetchUserProfile = async (apiUrl: string) => {
  const authStore = useAuthStore()
  const response = await axios.get(`${apiUrl}/api/me`, {
    headers: { Authorization: `Bearer ${authStore.accessToken}` }
  })
  return response.data
}
