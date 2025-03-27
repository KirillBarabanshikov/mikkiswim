import axios from 'axios'

import type { CertificateCheck } from '~/entities/certificate/model/Certificate'
import type {
  CertificateListing,
  CertificatePreview,
  CertificatePreviewResponse
} from '~/features/CertificateForm/types'
import { useAuthStore } from '~/share/store/authStore'

export const getCertificates = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const response = await axios.get(`${API}/api/certificates`)
  return response.data
}

export const getCertificate = async (id: string) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const response = await axios.get(`${API}/api/certificates/${id}`)
  return response.data
}

export const setCertificatesPreview = async (data: CertificatePreview) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const response = await axios.post<CertificatePreviewResponse>(
    `${API}/api/certificate_buys/preview`,
    data
  )
  return response.data
}

export const setCertificatesListing = async (data: CertificateListing) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.post(
    `${API}/api/certificate_buys/listing`,
    data,
    {
      headers: { Authorization: `Bearer ${authStore.accessToken}` }
    }
  )
  return response.data
}

export const checkCertificate = async (
  code: string
): Promise<CertificateCheck> => {
  const {
    public: { API }
  } = useRuntimeConfig()

  const authStore = useAuthStore()

  const response = await axios.get<CertificateCheck>(
    `${API}/api/certificate_buys/checks`,
    {
      params: { code },
      headers: { Authorization: `Bearer ${authStore.accessToken}` }
    }
  )

  return response.data
}
