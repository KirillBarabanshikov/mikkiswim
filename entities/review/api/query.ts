import { useMutation, useQuery } from '@tanstack/vue-query'

import {
  addReview,
  editReview,
  getReview,
  removeReview
} from '~/share/api/review'

export const useAddReview = () =>
  useMutation({
    mutationFn: (formData: FormData) => addReview(formData)
  })

export const useReviews = () =>
  useQuery({
    queryKey: ['review'],
    queryFn: () => getReview(),
    staleTime: 1000 * 60 * 30
  })
export const useEditReview = () =>
  useMutation<any, Error, { formData: FormData; id: number }>({
    mutationFn: editReview
  })

export const useRemoveReview = () =>
  useMutation({
    mutationFn: (id: number) => removeReview(id)
  })
