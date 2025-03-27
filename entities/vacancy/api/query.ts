import { useMutation, useQuery } from '@tanstack/vue-query'

import { addVacancyApplication, getVacancies } from '~/share/api/vacancy'

export const useVacancies = () =>
  useQuery({
    queryKey: ['certificates'],
    queryFn: getVacancies
  })

export const useAddVacancy = () =>
  useMutation({
    mutationFn: (formData: FormData) => addVacancyApplication(formData)
  })
