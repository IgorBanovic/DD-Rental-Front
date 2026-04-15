import { apiClient } from '@/lib/apiClient'

export function registerUser(payload) {
  return apiClient('/register', {
    method: 'POST',
    body: payload,
  })
}

export function loginUser(payload) {
  return apiClient('/login', {
    method: 'POST',
    body: payload,
  })
}

export function logoutUser() {
  return apiClient('/logout', {
    method: 'POST',
    authenticated: true,
  })
}
