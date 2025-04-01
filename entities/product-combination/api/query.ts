import { useQuery } from '@tanstack/vue-query'

import type { ProductCombination } from '~/entities/product-combination/model/ProductCombination'
import {
  getProductCombination,
  getProductCombinations
} from '~/share/api/productCombinations'

export const useProductCombinations = () => {
  const {
    public: { API }
  } = useRuntimeConfig()

  return useQuery<ProductCombination[]>({
    queryKey: ['product-combinations'],
    queryFn: () => getProductCombinations(API)
  })
}

export const useProductCombination = (id: string) => {
  const {
    public: { API }
  } = useRuntimeConfig()

  return useQuery<ProductCombination>({
    queryKey: ['product-combination', id],
    queryFn: () => getProductCombination(API, id)
  })
}
