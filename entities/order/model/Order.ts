import type { Refund } from '~/entities/refund/model/Refund'

export interface ProductImage {
  id: number
  image: string
}

export interface ProductTag {
  id: number
  title: string
  color: string
}

export interface ProductSize {
  id: number
  title: string
  active: boolean
}

export interface MarketplaceLink {
  id: number
  image: string
  link: string
}

export interface Care {
  id: number
  type: string
  title: string
}

export interface Catalog {
  id: number
  title: string
  slug: string
}

export interface Product {
  id: number
  title: string
  price: number
  oldPrice: number
  viewers: number
  description: string
  images: ProductImage[]
  tags: ProductTag[]
  color: string
  reviews: any[]
  sizes: ProductSize[]
  marketplaceLinks: MarketplaceLink[]
  delivery: string
  payments: string
  helpSizes: any
  materials: string
  care: Care[]
  weight: number
  length: number
  width: number
  height: number
  quantity: number
  catalogs: Catalog[]
  combinations: any[]
}

export interface OrderProduct {
  product: Product
  quantity: number
}

export interface OrderProductsDataItem {
  cost: number
  costWithoutLoyalty: number
  mikkiswim: number
}

export interface ProductsData {
  total: number

  [productId: string]: number | OrderProductsDataItem
}

export interface Promocode {
  title: string
  percent: number
  promoCode: string
}

export interface Order {
  id: number
  status: string
  name: string
  surname: string
  email: string
  phone: string
  address: string
  withFitting: boolean
  comment: string
  productsCost: number
  deliveryCost: number
  deliveryType: string
  mikkiCoinsUsed: number
  mikkiCoinsGain: number
  paymentInfo: string
  promoCode: Promocode
  products: OrderProduct[]
  refunds: Refund[]
  productsData: ProductsData
  statusText: string
  total: number
  orderDate: string
}
