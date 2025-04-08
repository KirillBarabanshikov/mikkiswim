import { useMutation, useQuery } from '@tanstack/vue-query'

import { addRefund, getRefunds } from '~/share/api/refund'

export const useRefunds = () =>
  useQuery({
    queryKey: ['refunds'],
    queryFn: () => getRefunds()
  })

export const useAddRefund = () =>
  useMutation({
    mutationFn: (data) => addRefund(data)
  })
