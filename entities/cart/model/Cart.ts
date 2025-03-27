import type { Product } from '~/entities/product/model/Product'

export interface Cart {
  product: Product
  quantity: number
  size: string
}
