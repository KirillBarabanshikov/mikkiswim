import { useMutation, useQuery } from '@tanstack/vue-query'

import { getOrders, postOrderB2B } from '~/share/api/order'

export const useOrders = () =>
  useQuery({
    queryKey: ['order'],
    queryFn: () => getOrders(),
    staleTime: 1000 * 60 * 30
  })

export const usePostOrderB2b = () =>
  useMutation({
    mutationFn: (orderData) => postOrderB2B(orderData)
  })
