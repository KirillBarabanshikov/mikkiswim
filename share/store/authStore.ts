import { useQueryClient } from '@tanstack/vue-query'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useCookie } from '#app'
import { addWishesByIds } from '~/entities/wish/api/query'
import { fetchUserProfile } from '~/share/api/auth'
import { useRefreshToken } from '~/share/query/auth/useAuth'
import { useFavoriteStore } from '~/share/store/favoriteStore'
import { useGlobalStore } from '~/share/store/globalStore'
import { useUserStore } from '~/share/store/userStore'

export const useAuthStore = defineStore('authStore', () => {
  const isAuthenticated = ref(false)
  const accessToken = ref('')
  const router = useRouter()
  const userStore = useUserStore()
  const globalStore = useGlobalStore()
  const favoriteStore = useFavoriteStore()
  const queryClient = useQueryClient()
  const refreshTokenCookie = useCookie('refresh_token', {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 дней
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })

  const userStatus = ref<string | null>(null)

  const setAccessToken = (token: string) => {
    accessToken.value = token
    isAuthenticated.value = true
  }

  const login = async (
    data: { token: string; refresh_token: string },
    apiUrl: string
  ) => {
    if (data.token && data.refresh_token) {
      setAccessToken(data.token)
      console.log('Установка refresh_token:', data.refresh_token)
      refreshTokenCookie.value = data.refresh_token // Сохраняем через useCookie
      console.log('refresh_token сохранен в cookies:', refreshTokenCookie.value)
      if (!refreshTokenCookie.value) {
        console.error('Не удалось сохранить refresh_token в cookies!')
      }

      await addWishesByIds(favoriteStore.favorites)

      try {
        const userProfile = await fetchUserProfile(apiUrl)
        userStore.setUser(userProfile)

        const redirectPath = userStore.isB2BUser
          ? '/b2b/catalog'
          : '/cabinet?chapter=purchases'
        await router.push(redirectPath)
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error)
        await router.push('/b2b')
      }

      globalStore.toggleIsOpenAuthentication(false)
    } else {
      console.error('Некорректные данные для логина:', data)
    }
  }

  const logout = async () => {
    isAuthenticated.value = false
    accessToken.value = ''
    userStore.setUser(null)
    refreshTokenCookie.value = null
    queryClient.clear()
    await router.push('/')
  }

  const getTokenRemainingTime = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000
    const now = Date.now()
    return exp - now
  }

  const refreshAccessToken = async (apiUrl: string) => {
    const refreshToken = refreshTokenCookie.value
    if (!refreshToken) {
      console.error('refresh_token отсутствует в cookies')
      return { success: false, error: 'No refresh token available' }
    }
    const { mutateAsync: refresh } = useRefreshToken(apiUrl)
    try {
      console.log('Попытка обновления токена с refresh_token:', refreshToken)
      const response = await refresh(refreshToken)
      console.log('Ответ от /api/refresh_token:', response)
      if (response.token) {
        setAccessToken(response.token)
        const userProfile = await fetchUserProfile(apiUrl)
        userStore.setUser(userProfile)
        return { success: true }
      } else {
        throw new Error('Не удалось обновить токен')
      }
    } catch (error) {
      console.error('Ошибка обновления токена:', error)
      return { success: false, error: error.message }
    }
  }

  return {
    accessToken,
    getTokenRemainingTime,
    isAuthenticated,
    login,
    logout,
    refreshAccessToken,
    userStatus
  }
})
