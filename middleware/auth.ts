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

  // На сервере синхронизируем состояние аутентификации перед проверками
  if (isServer && refreshToken.value && !authStore.isAuthenticated) {
    console.log(
      'Сервер: обнаружен refresh_token, синхронизация состояния:',
      refreshToken.value
    )
    const refreshResult = await authStore.refreshAccessToken(apiUrl)
    if (refreshResult.success) {
      console.log('Сервер: токен успешно обновлен')
      if (!userStore.user?.id) {
        await userStore.fetchUser(apiUrl)
      }
    } else {
      console.error('Сервер: ошибка обновления токена:', refreshResult.error)
      // Если токен не обновился и страница требует B2B-доступ, перенаправляем
      if (isB2BPage && !publicB2BPages.includes(to.path)) {
        return navigateTo('/b2b', { redirectCode: 302 })
      }
    }
  }

  // Проверка доступа к B2B-страницам
  if (isB2BPage && !publicB2BPages.includes(to.path)) {
    if (!authStore.isAuthenticated) {
      console.log('Неаутентифицированный доступ к B2B-странице:', to.path)
      return navigateTo('/b2b', { redirectCode: isServer ? 302 : undefined })
    }
    if (authStore.isAuthenticated && !userStore.isB2BUser) {
      console.log(
        'Обычный пользователь пытается зайти на B2B-страницу:',
        to.path
      )
      return navigateTo('/', { redirectCode: isServer ? 302 : undefined })
    }
  }

  // Проверка доступа B2B-пользователей к не-B2B страницам
  if (authStore.isAuthenticated && userStore.isB2BUser) {
    if (!isB2BPage && to.path !== '/cabinet') {
      console.log(
        'B2B-пользователь пытается зайти на не-B2B страницу:',
        to.path
      )
      return navigateTo('/b2b/catalog', {
        redirectCode: isServer ? 302 : undefined
      })
    }
  }

  // Дополнительная обработка на сервере для страниц, требующих аутентификации
  if (isServer && requiresAuth && !authStore.isAuthenticated) {
    if (!refreshToken.value) {
      console.log('Сервер: refresh_token отсутствует, перенаправление на /b2b')
      return navigateTo('/b2b', { redirectCode: 302 })
    }
    // Если refresh_token уже обработан выше, здесь ничего не делаем
  }

  // Клиентская логика
  if (!isServer) {
    if (refreshToken.value && !authStore.isAuthenticated) {
      const refreshResult = await authStore.refreshAccessToken(apiUrl)
      if (refreshResult.success) {
        if (!userStore.user?.id) {
          await userStore.fetchUser(apiUrl)
        }
        // После обновления токена проверяем доступ
        if (isB2BPage && !userStore.isB2BUser) {
          return navigateTo('/')
        }
        if (!isB2BPage && userStore.isB2BUser && to.path !== '/cabinet') {
          return navigateTo('/b2b/catalog')
        }
      } else {
        console.error('Клиент: ошибка обновления токена:', refreshResult.error)
        return navigateTo('/b2b')
      }
    }

    if (requiresAuth && !authStore.isAuthenticated) {
      console.log(
        'Клиент: неаутентифицированный доступ к защищенной странице:',
        to.path
      )
      return navigateTo('/b2b')
    }

    if (to.meta.requiresGuest && authStore.isAuthenticated) {
      return navigateTo('/')
    }
  }
})
