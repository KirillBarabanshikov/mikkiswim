import type { DateModel } from '~/features/CertificateForm/types'

export interface FormScheme {
  name: string
  phone: string
  dateAt: DateModel | null
  timeAt: string
}

export interface FormSchemeData {
  name: string
  phone: string
  dateAt: string | null
  timeAt: string
}
