import { jwtDecode } from 'jwt-decode'

// Пример функции для хранения токена
export const saveToken = (token: string) => {
  localStorage.setItem('authToken', token)
}

export const getToken = (): string | null => localStorage.getItem('authToken')
