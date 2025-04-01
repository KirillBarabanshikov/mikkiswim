import axios from 'axios'

import type { ProductCombination } from '~/entities/product-combination/model/ProductCombination'

export const getProductCombinations = async (
  apiBaseUrl: string
): Promise<ProductCombination[]> => {
  try {
    const response = await axios.get<ProductCombination[]>(
      `${apiBaseUrl}/api/combinations`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching product combinations:', error)
    throw error
  }
}

export const getProductCombination = async (
  apiBaseUrl: string,
  id: string
): Promise<ProductCombination> => {
  try {
    const response = await axios.get<ProductCombination>(
      `${apiBaseUrl}/api/combinations/${id}`
    )
    return response.data
  } catch (error) {
    console.error(`Error fetching combination ${id}:`, error)
    throw error
  }
}
