import { useMutation, useQuery } from '@tanstack/vue-query'

import type { Product, ProductReview } from '~/entities/product/model/Product'
import { setCertificatesPreview } from '~/share/api/certificate'
import {
  addViewerProducts,
  getAllProduct, // Добавляем новый метод
  getLookProducts,
  getProduct,
  getProductCombination,
  getProductReviews,
  getProducts,
  getProductsByIds,
  getProductsBySlug,
  getProductsFilters,
  getRecommendedProducts,
  setProductsSizesEmail} from '~/share/api/product'

export const useProducts = (params: Record<string, any>) =>
  useQuery<Product[], Error>({
    queryKey: ['products', JSON.stringify(params)],
    queryFn: () => getProducts(params)
  })

export const useProductsBySlug = (slug: string) =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => getProductsBySlug(slug)
  })

export const useProduct = (slug: string) =>
  useQuery<Product>({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug)
  })

export const useProductReviews = (
  productId: number,
  page: number = 1,
  limit: number = 10
) =>
  useQuery<{ data: ProductReview[]; totalItems: number }>({
    queryKey: ['productReviews', productId, page, limit],
    queryFn: () => getProductReviews(productId, page, limit)
  })

export const useViewerProducts = (id: number) =>
  useQuery<Product[]>({
    queryKey: ['viewerProducts', id],
    queryFn: () => addViewerProducts(id)
  })

export const useProductsFilters = (catalogSlug: string) =>
  useQuery({
    queryKey: ['productsFilters', catalogSlug],
    queryFn: () => getProductsFilters(catalogSlug)
  })

export const useRecommendedProducts = (id: number) =>
  useQuery({
    queryKey: ['recommendedProducts', id],
    queryFn: () => getRecommendedProducts(id)
  })

export const useLookProducts = (id: number) =>
  useQuery({
    queryKey: ['lookProducts', id],
    queryFn: () => getLookProducts(id)
  })

export const useProductsByIds = (ids: number[]) =>
  useQuery({
    queryKey: ['productsByIds', ids],
    queryFn: () => getProductsByIds(ids)
  })

export const useProductsSizes = () =>
  useMutation({
    mutationFn: setProductsSizesEmail
  })

// Новый хук для getAllProduct
export const useAllProducts = (
  query?: string,
  color?: string,
  size?: string,
  priceStart?: string,
  priceEnd?: string,
  catalog?: string,
  sortBy?: string,
  page?: string,
  limit?: string
) =>
  useQuery<Product[], Error>({
    queryKey: [
      'allProducts',
      query,
      color,
      size,
      priceStart,
      priceEnd,
      catalog,
      sortBy,
      page,
      limit
    ],
    queryFn: () =>
      getAllProduct(
        query,
        color,
        size,
        priceStart,
        priceEnd,
        catalog,
        sortBy,
        page,
        limit
      )
  })
