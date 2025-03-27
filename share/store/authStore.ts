import { useQueryClient } from '@tanstack/vue-query'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

      Cookies.set('refresh_token', data.refresh_token, {
        expires: 30,
        httpOnly: false,
        sameSite: 'Strict',
        secure: true
      })
      globalStore.toggleIsOpenAuthentication(false)
    }
  }

  const logout = async () => {
    isAuthenticated.value = false
    accessToken.value = ''
    userStore.setUser(null)
    Cookies.remove('refresh_token')
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
    const refreshToken = Cookies.get('refresh_token')
    const { mutateAsync: refresh } = useRefreshToken(apiUrl)
    try {
      console.log('Попытка обновления токена с refresh_token:', refreshToken)
      const response = await refresh(refreshToken)
      console.log('Ответ от /api/refresh_token:', response)
      if (response.token) {
        setAccessToken(response.token)
        const userProfile = await fetchUserProfile(apiUrl)
        userStore.setUser(userProfile)
      } else {
        throw new Error('Не удалось обновить токен')
      }
    } catch (error) {
      console.error('Ошибка обновления токена:', error)
      throw error
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
