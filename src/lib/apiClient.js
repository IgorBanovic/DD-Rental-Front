import { useAuthStore } from '@/features/auth/hooks/useAuth'
import { API_BASE_URL } from '@/lib/env'

export async function apiClient(path, options = {}) {
  const token = useAuthStore.getState().token
  const { authenticated = false, headers, body, ...restOptions } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(headers || {}),
      ...(authenticated && token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Request failed')
  }

  return data
}
