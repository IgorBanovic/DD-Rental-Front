import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '@/features/auth/api/authApi'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function useLogout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout()
      navigate('/')
    },
    onError: () => {
      logout()
      navigate('/')
    },
  })
}
