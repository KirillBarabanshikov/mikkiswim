//@ts-ignore

import { ref } from 'vue'

import { useBodyLock } from '~/share/utils/bodyLock'

const { lock, unlock } = useBodyLock()

export const useGlobalStore = defineStore('globalStore', () => {
  const isLoading = ref(false)
  const isOpenSearch = ref(false)
  const isOpenCatalog = ref(false)
  const isOpenMenu = ref(false)
  const isOpenAuthentication = ref(false)
  const isOpenBasket = ref(false)
  const isFilterMenuVisible = ref(false)
  const isGrid = ref('four')

  const setIsLoading = (bool: boolean) => {
    isLoading.value = bool
  }
  const toggleIsOpenCatalog = () => {
    isOpenCatalog.value = !isOpenCatalog.value
  }

  const toggleIsOpenMenu = (value: boolean) => {
    if (isOpenMenu.value) {
      unlock()
    } else {
      lock()
    }
    isOpenMenu.value = value
  }

  const toggleIsOpenAuthentication = (b: boolean) => {
    if (typeof b === 'undefined')
      isOpenAuthentication.value = !isOpenAuthentication.value
    else isOpenAuthentication.value = b
  }

  const toggleIsOpenSearch = () => {
    isOpenSearch.value = !isOpenSearch.value
  }

  const closeSearch = (bool: boolean) => {
    isOpenSearch.value = bool
  }

  const setIsGrid = (val: string) => {
    isGrid.value = val
    localStorage.setItem('grid', val)
  }

  const toggleIsOpenBasket = () => {
    isOpenBasket.value = !isOpenBasket.value
  }

  const toggleFilterMenu = (b: boolean) => {
    if (typeof b === 'undefined')
      isFilterMenuVisible.value = !isFilterMenuVisible.value
    else isFilterMenuVisible.value = b
  }

  return {
    isLoading,
    isOpenCatalog,
    isOpenMenu,
    isOpenSearch,
    isOpenAuthentication,
    isOpenBasket,
    isFilterMenuVisible,
    setIsLoading,
    toggleIsOpenCatalog,
    toggleIsOpenAuthentication,
    toggleIsOpenMenu,
    toggleIsOpenSearch,
    toggleIsOpenBasket,
    closeSearch,
    setIsGrid,
    toggleFilterMenu
  }
})
