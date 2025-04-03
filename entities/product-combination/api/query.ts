import { useQuery } from '@tanstack/vue-query'

import type { ProductCombination } from '~/entities/product-combination/model/ProductCombination'
import {
  getProductCombination,
  getProductCombinations
} from '~/share/api/productCombinations'
import type { Product } from '~/entities/product/model/Product'
import axios from 'axios'

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

export const addViewToCombination = async (
  id: number
): Promise<ProductCombination> => {
  const {
    public: { API }
  } = useRuntimeConfig()

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${API}/api/combinations/viewers`, {
      id: id
    })
    return response.data
  } catch (error) {
    throw error
  }
}
