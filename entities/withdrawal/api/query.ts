import { useMutation, useQuery } from '@tanstack/vue-query'

import type { WithdrawalRequest } from '~/entities/withdrawal/model/Withdrawal'
import { addWithdrawals, getWithdrawals } from '~/share/api/withdrawal'

export const useWithdrawals = () =>
  useQuery({
    queryKey: ['withdrawal'],
    queryFn: () => getWithdrawals(),
    staleTime: 1000 * 60 * 30
  })

export const useAddWithdrawal = () =>
  useMutation({
    mutationFn: (data: WithdrawalRequest) => addWithdrawals(data)
  })
