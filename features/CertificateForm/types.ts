export interface DateModel {
  calendar: {
    identifier: string
  }
  era: string
  year: number
  month: number
  day: number
}

interface PriceModel {
  id: number
  content: string
  value: number
}

export interface FormScheme {
  email: string
  name: string
  price: PriceModel | null
  after: boolean
  message: string
  date: DateModel | null
  time: string
}

export interface CertificatePreview {
  id: number
  price: number
}

export interface CertificatePreviewResponse {
  pdfUrl: string
}

export interface CertificateListing {
  id: number
  price: number
  dateTimeAt: string | null
  after: boolean
  message: string
  email: string
  name: string
}
