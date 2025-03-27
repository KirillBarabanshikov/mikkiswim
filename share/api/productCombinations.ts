import axios from 'axios'

import type { ProductCombination } from '~/entities/product-combination/model/ProductCombination'

export const getProductCombinations = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const response = await axios.get<ProductCombination[]>(
    `${API}/api/combinations`
  )
  return response.data
}
