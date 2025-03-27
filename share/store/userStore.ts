//@ts-ignore
import { defineStore } from 'pinia' // Добавляем импорт defineStore
import { computed, ref } from 'vue' // Добавляем импорт computed

import type { User } from '~/entities/user/model/User'
import { fetchUserProfile } from '~/share/api/auth'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User | null>(null)
  const isB2BUser = computed(() => !!user.value?.userB2B)

  const setUser = (data: User) => {
    user.value = data
  }

  const updateEmail = (newEmail: string) => {
    if (user.value) user.value.email = newEmail
  }

  const fetchUser = async (apiUrl: string) => {
    const data = await fetchUserProfile(apiUrl)
    setUser(data)
  }

  const updateUserInfo = (newInfo: Partial<User>) => {
    if (!user.value) return
    user.value = { ...user.value, ...newInfo }
  }

  return {
    user,
    isB2BUser,
    setUser,
    updateEmail,
    fetchUser,
    updateUserInfo
  }
})
