import { useAuthStore } from '~/share/store/authStore'
import { useUserStore } from '~/share/store/userStore'

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.API
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const refreshToken = useCookie('refresh_token')
  const event = useRequestEvent()
  const isServer = !!event

  const publicB2BPages = ['/b2b', '/b2b-register']
  if (publicB2BPages.includes(to.path)) {
    return
  }

  const requiresAuth = to.meta.requiresAuth === true
  const isB2BPage = to.path.startsWith('/b2b')

  // Проверка для B2B-пользователей в первую очередь на клиенте
  if (!isServer && authStore.isAuthenticated && userStore.isB2BUser) {
    if (!isB2BPage && to.path !== '/cabinet') {
      return navigateTo('/b2b/catalog')
    }
  }

  if (isServer) {
    if (requiresAuth && !authStore.isAuthenticated) {
      if (refreshToken.value) {
        try {
          await authStore.refreshAccessToken(apiUrl)
          if (!userStore.user?.id) {
            await userStore.fetchUser(apiUrl)
          }
        } catch (error) {
          console.error('Ошибка обновления токена на сервере:', error)
          if (!isB2BPage) {
            return navigateTo('/b2b', { redirectCode: 302 })
          }
          return
        }
      }
      if (!authStore.isAuthenticated && !isB2BPage) {
        return navigateTo('/b2b', { redirectCode: 302 })
      }
    }
  } else {
    if (refreshToken.value && !authStore.isAuthenticated) {
      try {
        await authStore.refreshAccessToken(apiUrl)
        if (!userStore.user?.id) {
          await userStore.fetchUser(apiUrl)
        }
      } catch (error) {
        console.error('Ошибка обновления токена на клиенте:', error)
      }
    }

    if (requiresAuth && !authStore.isAuthenticated) {
      console.log('Неавторизованный доступ к защищенной странице:', to.path)
      if (!isB2BPage) {
        return navigateTo('/b2b')
      }
    }

    if (to.meta.requiresGuest && authStore.isAuthenticated) {
      return navigateTo('/')
    }

    if (authStore.isAuthenticated) {
      if (userStore.isB2BUser) {
        if (!isB2BPage && to.path !== '/cabinet') {
          return navigateTo('/b2b/catalog')
        }
      } else {
        if (isB2BPage) {
          return navigateTo('/')
        }
      }
    }
  }
})
