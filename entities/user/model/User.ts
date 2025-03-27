import type { LoyaltyProgram } from '~/entities/loyaltyProgram/model/LoyaltyProgram'
import type { Product, ProductReview } from '~/entities/product/model/Product'
import type { b2bData } from '~/entities/user-b2b/model/User-b2b'

export interface Carts {
  product: Product
  quantity: number
  //size: IToggleItem
}

export interface Wishes {
  product: Product
}

export interface PurchaseReturns {
  id: number
  type: string
  reason: string
  sum: number
  bank: string
  recipient: string
  kc: string
  bik: string
}

export interface Messages {
  id: number
  title: string
  description: string
}

export interface Withdraws {
  id: number
  bank: string
  recipient: string
  kc: string
  bik: string
  sum: number
}

export interface CoachPromocode {
  title: string
  percent: number
  promoCode: string
}

export interface CoachData {
  organization: string
  approved: boolean
  sportsmansCount: number
  link: string
  qualification: string
  comment: string
  image: string
  imagePassport: string
  promoCode: CoachPromocode
  paymentRequests: []
}

export interface User {
  id: number
  username: string
  // carts: Carts[]
  // wishes: Wishes[]
  // reviews: ProductReview[]
  name: string
  surname: string
  email: string
  phone: string
  postcode: number
  city: string
  houseNumber: string
  region: string
  street: string
  apartment: string
  loyaltyProgram: LoyaltyProgram
  // purchaseReturns: PurchaseReturns[]
  // messages: Messages[]
  // withdraws: Withdraws[]
  mikkiCoins: number
  moneySpent: number
  coachData: CoachData
  userB2B: b2bData
}
