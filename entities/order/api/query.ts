import { useQuery } from '@tanstack/vue-query'

import { getOrders, getPochtaTariff } from '~/share/api/order'

export const useOrders = () =>
  useQuery({
    queryKey: ['order'],
    queryFn: () => getOrders(),
    staleTime: 1000 * 60 * 30
  })
