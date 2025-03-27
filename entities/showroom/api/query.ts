import { useMutation } from '@tanstack/vue-query'

import type { FormSchemeData } from '~/features/ShowRoomPopup/types'
import { addShowroom } from '~/share/api/showroom'

export const useAddShowroom = () =>
  useMutation({
    mutationFn: (data: FormSchemeData) => addShowroom(data)
  })
