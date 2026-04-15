import { useMutation } from '@tanstack/react-query'
import { createReservation } from '@/features/reservations/api/reservationsApi'

export function useCreateReservation() {
  return useMutation({
    mutationFn: createReservation,
  })
}
