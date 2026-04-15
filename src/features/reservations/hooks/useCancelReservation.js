import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelReservation } from '@/features/reservations/api/reservationsApi'

export function useCancelReservation(userId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations', userId] })
    },
  })
}
