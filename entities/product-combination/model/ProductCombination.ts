import type { Product } from '~/entities/product/model/Product'

export interface ProductCombination {
  id: number
  title: string
  image: string
  combinationsProducts: CombinationProducts[]
  viewers: number
  defaultCost: number
  discountCost: number
}

interface CombinationProducts {
  id: number
  product: Product
  discount: number
}
