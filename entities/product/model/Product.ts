import type { Catalog } from '~/entities/catalog/model/Catalog'
import type { BadgeVariant } from '~/share/UI/Badge/Badge.vue'

export interface ProductTag {
  color: BadgeVariant
  title: string
  id: number
}

export interface ProductMarketplaceLink {
  link: string
  image: string
  id: number
}

export interface ProductSizes {
  active: boolean
  title: string
  id: number
  quantity: number
}

export interface ProductCare {
  id: number
  type: string
  title: string
}

export interface ProductImg {
  id: string | number
  image: string
}

export interface ProductReview {
  id: number
  userId: string | number
  advantages: string
  flaws: string
  comment: string
  stars: string | number
  userNameAndSurname: string
  dateAt: string
  images: ProductImg[]
  productImage?: string
  status?: string
  productId?: number
  productTitle?: string
  categoryTitle?: string
  productSlug?: string
}

export interface ProductCabinetReview {
  id: string | number
  userId: string | number
  advantages: string
  flaws: string
  comment: string
  stars: string | number
  userNameAndSurname: string
  dateAt: string
  images: ProductImg[]
  categoryTitle: string
  productId: string | number
  productImage: string
  productSlug: string
  productTitle: string
}

export interface Product {
  id: number
  average: number
  title: string
  inFavorites?: boolean
  oldPrice: number
  price: number
  slug: string
  tags?: ProductTag[]
  materials: string
  description: string
  care: ProductCare[]
  reviews: ProductReview[]
  images: ProductImg[]
  catalogs: Catalog[]
  delivery: string
  payments: string
  marketplaceLinks: ProductMarketplaceLink[]
  sizes: ProductSizes[]
  size?: string
  color: string
  viewers: number
  helpSizes: string | null
  weight: number
  length: number
  width: number
  height: number
  quantity: number
  combinations: any[]
  count: number
}
