import { useQuery } from '@tanstack/vue-query'

import { getCatalogs } from '~/share/api/catalog'

export const useCatalogs = () =>
  useQuery({
    queryKey: ['catalog'],
    queryFn: getCatalogs
  })
