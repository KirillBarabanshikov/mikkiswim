export interface FormScheme {
  orderId: number
  products: Product[]
  type: string
  reason: string
  bank: string
  recipient: string
  kc: string
  bik: string
  comment: string
  checkPart: boolean
  checkAll: boolean
  reasonColorSize: boolean
  reasonDefect: boolean
  reasonOther: boolean
}

interface Product {
  productId: number
  quantity: number
  size: string
}
