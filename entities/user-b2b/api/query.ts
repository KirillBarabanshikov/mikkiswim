import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import type { b2bData } from '~/entities/user-b2b/model/User-b2b'
import type { FormScheme } from '~/features/B2BRegisterForm/types'
import {
  changePersonalB2BInfo,
  getManager,
  registerB2B
} from '~/share/api/user-b2b'
import { useUserStore } from '~/share/store/userStore'
import { fetchUserProfile } from '~/share/api/auth'

export const useRegisterB2B = () =>
  useMutation({
    mutationFn: (data: FormScheme) => registerB2B(data)
  })

export const useManager = () =>
  useQuery({
    queryKey: ['manager'],
    queryFn: () => getManager(),
    staleTime: 1000 * 60 * 30
  })

export const useChangeInfoB2B = () => {
  const queryClient = useQueryClient()
  const userStore = useUserStore()

  return useMutation({
    mutationFn: (data: b2bData) => changePersonalB2BInfo(data),
    onSuccess: async (data, variables) => {
      const userProfile = await fetchUserProfile()
      userStore.setUser(userProfile)
      queryClient.setQueryData(['user'], userProfile)
    }
  })
}
