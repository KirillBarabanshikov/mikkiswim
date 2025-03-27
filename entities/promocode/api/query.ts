import { useQuery } from '@tanstack/vue-query'

import { getPromocode } from '~/share/api/promocode'

export const usePromocode = (promocode: ComputedRef<string>) =>
  useQuery({
    queryKey: ['promocode', promocode.value],
    queryFn: () => getPromocode(promocode.value),
    enabled: computed(() => Boolean(promocode.value))
  })
