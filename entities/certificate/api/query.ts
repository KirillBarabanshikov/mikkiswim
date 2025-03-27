import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import {
  checkCertificate,
  getCertificate,
  getCertificates,
  setCertificatesListing,
  setCertificatesPreview
} from '~/share/api/certificate'

export const useCertificates = () =>
  useQuery({
    queryKey: ['certificates'],
    queryFn: getCertificates
  })

export const useCertificate = (id: string) =>
  useQuery({
    queryKey: ['certificate', id],
    queryFn: () => getCertificate(id)
  })

export const useCertificatePreview = () =>
  useMutation({
    mutationFn: setCertificatesPreview
  })

export const useCertificateListing = () =>
  useMutation({
    mutationFn: setCertificatesListing
  })

export const useCheckCertificate = () =>
  useMutation({
    mutationFn: checkCertificate
  })
