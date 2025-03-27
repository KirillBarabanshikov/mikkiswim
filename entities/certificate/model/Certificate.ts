export interface Certificate {
  id: number
  title: string
  description: string
  price: number
  image: string
  shortDescription: string
  category: string
}

export interface CertificateCheck {
  id: number
  image: string
  price: number
  dateTimeAt: string
  code: string
  isActivated: boolean
  serialNumber: string
  name: string
  pdf: string
}
