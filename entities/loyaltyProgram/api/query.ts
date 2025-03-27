import { useQuery } from '@tanstack/vue-query'

import { getLoyaltyPrograms } from '~/share/api/loyaltyProgram'

export const useLoyaltyPrograms = () =>
  useQuery({
    queryKey: ['loyaltyProgram'],
    queryFn: () => getLoyaltyPrograms(),
    staleTime: 1000 * 60 * 30
  })
