//@ts-ignore

import { computed, ref } from 'vue'

import { useProducts } from '~/entities/product/api/query'

export const useFilterStore = defineStore('product', () => {
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError
  } = useProducts()

  const selectedCatalog = ref<string | null>(null)
  const selectedColor = ref<string | null>(null)
  const priceRange = ref<[number, number]>([0, 1000])

  const applyFilters = computed(() => {
    if (!products.value) return []
    return products.value.filter((product) => {
      const matchesCatalog = selectedCatalog.value
        ? product.catalogs.some(
            (catalog) => catalog.slug === selectedCatalog.value
          )
        : true
      const matchesColor = selectedColor.value
        ? product.color === selectedColor.value
        : true
      const matchesPrice =
        product.price >= priceRange.value[0] &&
        product.price <= priceRange.value[1]
      return matchesCatalog && matchesColor && matchesPrice
    })
  })

  const setCatalog = (catalog: string | null) => {
    selectedCatalog.value = catalog
  }

  const setColor = (color: string | null) => {
    selectedColor.value = color
  }

  const setPriceRange = (range: [number, number]) => {
    if (range[0] > range[1]) {
      range = [range[1], range[0]]
    }
    priceRange.value = range
  }

  return {
    products,
    productsLoading,
    productsError,
    selectedCatalog,
    selectedColor,
    priceRange,
    applyFilters,
    setCatalog,
    setColor,
    setPriceRange
  }
})
