import axios from 'axios'

import type { Catalog } from '~/entities/catalog/model/Catalog'
import type { Filter } from '~/entities/filters/model/Filters'
import type { Product, ProductReview } from '~/entities/product/model/Product'
import type { ProductCombination } from '~/entities/product-combination/model/ProductCombination'
import { useAuthStore } from '~/share/store/authStore'

interface ProductsResponse {
  data: Product[]
}

export const getProductsBySlug = async (slug: string): Promise<Product[]> => {
  const {
    public: { API }
  } = useRuntimeConfig()

  try {
    const response = await axios.get<ProductsResponse>(
      `${API}/api/products/category/slug`
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const getAllProduct = async (
  query?: string,
  color?: string,
  size?: string,
  priceStart?: string,
  priceEnd?: string,
  catalog?: string,
  sortBy?: string,
  page?: string,
  limit?: string
): Promise<Product[]> => {
  const {
    public: { API }
  } = useRuntimeConfig()

  try {
    const queryParams = new URLSearchParams()

    if (query) queryParams.append('query', query)
    if (color) queryParams.append('color', color)
    if (size) queryParams.append('size', size)
    if (priceStart) queryParams.append('priceStart', priceStart)
    if (priceEnd) queryParams.append('priceEnd', priceEnd)
    if (catalog) queryParams.append('catalog', catalog)
    if (sortBy) queryParams.append('sortBy', sortBy)
    if (page) queryParams.append('page', page)
    if (limit) queryParams.append('limit', limit)

    const url = `${API}/api/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`

    const response = await axios.get<ProductsResponse>(url)
    return response.data.data
  } catch (error) {
    console.error('Error fetching all products:', error)
    throw error
  }
}

export const getProduct = async (slug: string): Promise<Product> => {
  if (!isNaN(Number(slug))) {
    throw new Error('Invalid product slug')
  }

  const {
    public: { API }
  } = useRuntimeConfig()

  const response = await axios.get<Product>(
    `${API}/api/products/slug?slug=${slug}`
  )
  return response.data
}

export const getProductReviews = async (
  productId: number,
  page: number = 1,
  limit: number = 10
): Promise<{ data: ProductReview[]; totalItems: number }> => {
  const {
    public: { API }
  } = useRuntimeConfig()

  try {
    const response = await axios.get<{
      data: ProductReview[]
      totalItems: number
    }>(
      `${API}/api/products/reviews?productId=${productId}&page=${page}&limit=${limit}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching product reviews:', error)
    throw error
  }
}
export const addViewerProducts = async (id: number): Promise<Product[]> => {
  const {
    public: { API }
  } = useRuntimeConfig()

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${API}/api/products/viewers`, { id: id })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getProducts = async (
  params: Record<string, any>
): Promise<Product[]> => {
  const {
    public: { API }
  } = useRuntimeConfig()
  // eslint-disable-next-line no-useless-catch
  try {
    const queryParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ''
      ) {
        queryParams.append(key, String(value))
      }
    })

    const url = `${API}/api/products?${queryParams.toString()}`

    const response = await axios.get<ProductsResponse>(url)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const getProductsFilters = async (catalogSlug: string) => {
  const {
    public: { API }
  } = useRuntimeConfig()

  try {
    const response = await axios.get<Filter>(
      `${API}/api/products/filters?catalogSlug=${catalogSlug}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching product filters:', error)
    throw error
  }
}

export const getLookProducts = async (id: number): Promise<Product[]> => {
  const {
    public: { API }
  } = useRuntimeConfig()

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get<Product[]>(
      `${API}/api/products/look?productId=${id}`
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const getRecommendedProducts = async (
  id: number
): Promise<Product[]> => {
  const {
    public: { API }
  } = useRuntimeConfig()
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get<Product[]>(
      `${API}/api/products/recommended?productId=${id}`
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const getProductsByIds = async (ids: number[]): Promise<Product[]> => {
  const {
    public: { API }
  } = useRuntimeConfig()

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get<Product[]>(`${API}/api/productsByIds`, {
      params: {
        ids
      },
      paramsSerializer: (params) =>
        Object.keys(params)
          .map((key) =>
            Array.isArray(params[key])
              ? params[key]
                  .map((val: any) => `${key}[]=${encodeURIComponent(val)}`)
                  .join('&')
              : `${key}=${encodeURIComponent(params[key])}`
          )
          .join('&')
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const setProductsSizesEmail = async (data: {
  sizesId: number
  email: string
}) => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post<Product>(
      `${API}/api/product_sizes`,
      {
        sizesId: data.sizesId,
        email: data.email
      },
      {
        headers: { Authorization: `Bearer ${authStore.accessToken}` }
      }
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const getProductCombination = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const response = await axios.get<ProductCombination[]>(
    `${API}/api/product_combinations`
  )
  return response.data
}
