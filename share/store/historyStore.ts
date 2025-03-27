//@ts-ignore

import { ref } from 'vue'

import { generateRandomId } from '~/share/utils/helpers/generateRandomId'

type HistoryType = 'search'
type HistorySearch = {
  id: number
  value: string
}
type HistoryState = {
  search: HistorySearch[]
}

export const useHistoryStore = defineStore('history', () => {
  const history = ref<HistoryState>({
    search: []
  })

  const isClient = typeof window !== 'undefined'

  const loadFromLocalStorage = () => {
    if (isClient) {
      const savedHistory = localStorage.getItem('history')
      if (savedHistory) {
        history.value = JSON.parse(savedHistory)
      }
    }
  }

  const saveToLocalStorage = () => {
    if (isClient) {
      localStorage.setItem('history', JSON.stringify(history.value))
    }
  }

  const addHistory = (historyType: HistoryType, value: string): boolean => {
    if (historyType in history.value) {
      history.value[historyType].push({ id: generateRandomId(), value })
      saveToLocalStorage()
      return true
    }
    return false
  }

  const getHistory = (historyType: HistoryType): HistorySearch[] =>
    historyType in history.value ? history.value[historyType] : []

  const deleteHistory = (historyType: HistoryType, id: number): boolean => {
    if (historyType in history.value) {
      history.value[historyType] = history.value[historyType].filter(
        (item) => item.id !== id
      )
      saveToLocalStorage()
      return true
    }
    return false
  }

  const clearHistory = (historyType: HistoryType): boolean => {
    if (historyType in history.value) {
      history.value[historyType] = []
      saveToLocalStorage()
      return true
    }
    return false
  }

  if (isClient) {
    loadFromLocalStorage()
  }

  return {
    history,
    addHistory,
    getHistory,
    deleteHistory,
    clearHistory,
    loadFromLocalStorage
  }
})
