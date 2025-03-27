import { useQuery } from '@tanstack/vue-query'

import type { ProductCombination } from '~/entities/product-combination/model/ProductCombination'
import { getProductCombinations } from '~/share/api/productCombinations'

export const useProductCombinations = () =>
  useQuery<ProductCombination[]>({
    queryKey: ['product-combination'],
    queryFn: getProductCombinations
  })
