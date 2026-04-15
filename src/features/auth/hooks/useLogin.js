import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '@/features/auth/api/authApi'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function useLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.user, data.token)
      navigate('/dashboard')
    },
  })
}
