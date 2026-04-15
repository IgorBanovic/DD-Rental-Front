import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/features/auth'
import { updateProfile } from '@/features/profile/api/profileApi'

export function useUpdateProfile() {
  const { user, setUser } = useAuth()

  return useMutation({
    mutationFn: (payload) => updateProfile(user?.id, payload),
    onSuccess: (response) => {
      const updatedUser = response?.data?.user || response?.user || response?.data || response
      if (updatedUser) {
        setUser(updatedUser)
      }
    },
  })
}
