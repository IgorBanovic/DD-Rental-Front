import { useAuth } from '@/features/auth'

export function useProfile() {
  const { user } = useAuth()

  return {
    user,
  }
}
