import { useMutation, useQuery } from '@tanstack/vue-query'

import {
  fetchUserProfile,
  login,
  refreshToken,
  register
} from '~/share/api/auth'
import { saveToken } from '~/share/utils/jwt'

export const useAuth = (isLogin: boolean, apiUrl: string) =>
  useMutation({
    mutationFn: (data: {
      username: string
      password: string
      email?: string
    }) => {
      if (isLogin) {
        return login(data.username, data.password, apiUrl)
      } else {
        return register(data.username, data.password, data.email, apiUrl)
      }
    },
    onSuccess: (token: string) => {
      saveToken(token)
    },
    onError: (error) => {
      console.error(isLogin ? 'Login failed' : 'Registration failed', error)
    }
  })

export const useRefreshToken = (apiUrl: string) =>
  useMutation({
    mutationFn: (refreshT: string) => refreshToken(refreshT, apiUrl),
    onError: (error) => {
      console.error('Ошибка обновления токена:', error)
    }
  })

export const useUserProfile = (token: string, apiUrl: string) =>
  useQuery({
    queryKey: ['user', token],
    queryFn: () => fetchUserProfile(apiUrl),
    enabled: !!token,
    staleTime: 1000 * 60 * 5
  })
