import type { Catalog } from '~/entities/catalog/model/Catalog'

export interface Colors {
  content: string
  value: string
}

export interface Sizes {
  content: string
  value: string
}

export interface Prices {
  min: number
  max: number
}

export interface Filter {
  colors: Colors[]
  sizes: Sizes[]
  childCatalogs: Catalog[]
  prices: Prices
}
