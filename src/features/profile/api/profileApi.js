import { apiClient } from '@/lib/apiClient'

export function updateProfile(userId, payload) {
  return apiClient(`/users/${userId}`, {
    method: 'PATCH',
    authenticated: true,
    body: payload,
  })
}
