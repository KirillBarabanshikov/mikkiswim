import { useQuery } from '@tanstack/vue-query'

import { getMessages } from '~/share/api/message'

export const useMessage = () =>
  useQuery({
    queryKey: ['message'],
    queryFn: () => getMessages()
  })
