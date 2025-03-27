import { QueryClient } from '@tanstack/vue-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // Данные считаются актуальными 1 минуту
      // cacheTime: 1000 * 60 * 5, // Данные хранятся в кэше 5 минут
      retry: 2, // Количество попыток при ошибке
      refetchOnWindowFocus: false // Не обновлять данные при возвращении в окно
    }
  }
})
