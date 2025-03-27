import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { fetchUserProfile } from '~/share/api/auth'
import {
  changeEmail,
  changePassword,
  changePersonalInfo,
  checkRecoveryLink,
  getWishes,
  recoverPassword,
  resetPassword
} from '~/share/api/user'
import { useUserStore } from '~/share/store/userStore'

export const useChangeEmail = () => {
  const queryClient = useQueryClient()
  const userStore = useUserStore()

  return useMutation({
    mutationFn: (data: { email: string; emailConfirmation: string }) =>
      changeEmail(data),
    onSuccess: (data, variables) => {
      userStore.updateEmail(variables.email)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
}
export const useChangePassword = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { password: string; passwordConfirmation: string }) =>
      changePassword(data),
    onSuccess: (data, variables) =>
      queryClient.invalidateQueries({ queryKey: ['user'] })
  })
}
export const useUpdatePersonalInformation = () => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.API
  const queryClient = useQueryClient()
  const userStore = useUserStore()

  return useMutation({
    mutationFn: (data) => changePersonalInfo(data),
    onSuccess: async (data, variables) => {
      const userProfile = await fetchUserProfile(apiUrl)
      userStore.setUser(userProfile)
      queryClient.setQueryData(['user'], userProfile)
    },
    onError: (error) => {
      console.error('Ошибка при обновлении данных пользователя:', error)
    }
  })
}

export const useWishes = () =>
  useQuery({
    queryKey: ['wish'],
    queryFn: () => getWishes()
  })

export const useRecover = () =>
  useMutation({
    mutationFn: (email: string) => recoverPassword(email)
  })

export const useCheckRecoveryLink = (token: string, email: string) =>
  useQuery({
    queryKey: ['checkRecoveryLink', token, email],
    queryFn: () => checkRecoveryLink(token, email),
    retry: false
  })

export const useResetPassword = () =>
  useMutation({
    mutationFn: (data: { token: string; email: string; password: string }) =>
      resetPassword(data),
    onError: (error: any) => error
  })
