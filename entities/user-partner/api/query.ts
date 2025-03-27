import { useMutation, useQuery } from '@tanstack/vue-query'

import { getOrders } from '~/share/api/order'
import { getPartnerOrders, registerPartner } from '~/share/api/user-partner'

export const useRegisterPartner = () =>
  useMutation({
    mutationFn: (formData: FormData) => registerPartner(formData)
  })

export const usePartnerOrders = () =>
  useQuery({
    queryKey: ['partner-order'],
    queryFn: () => getPartnerOrders(),
    staleTime: 1000 * 60 * 30
  })
