import type { Product } from '~/entities/product/model/Product'

export interface Cart {
  product: Product
  quantity: number
  catalogs: Catalog[]
  size: string
  uuid: string
}

interface Catalog {
  id: number
  title: string
  slug: string
}
