import type { Product } from '~/entities/order/model/Order'

export interface Refund {
  id: string
  addressRefund: string
  products: RefundProduct[]
  type?: string
  reason?: string
  sum?: number
  bank?: string
  recipient?: string
  kc?: string
  bik?: string
  sizes?: Sizes[]
  refundDate: string
  status: string
  statusText: string
  orderId: string
}

export interface RefundProduct {
  product: Product
  quantity: number
  size: string
}

export interface Sizes {
  id: number
  title: string
  quantity: number
  active: boolean
}
