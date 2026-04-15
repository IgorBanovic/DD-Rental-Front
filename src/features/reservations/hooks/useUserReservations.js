import { useQuery } from '@tanstack/react-query'
import { getUserReservations } from '@/features/reservations/api/reservationsApi'

function mapReservation(reservation) {
  const carData = reservation.car || {}
  const carName =
    carData.name ||
    [carData.brand, carData.model].filter(Boolean).join(' ') ||
    reservation.car_name ||
    'Vehicle'

  return {
    id: reservation.id,
    car: carName,
    pickupDate: reservation.pickup_date || reservation.start_date || reservation.pickupDate || '-',
    returnDate: reservation.return_date || reservation.end_date || reservation.returnDate || '-',
    totalPrice: reservation.total_price || reservation.totalPrice || reservation.price || 0,
    status: reservation.status || 'Pending',
  }
}

export function useUserReservations(userId) {
  return useQuery({
    queryKey: ['reservations', userId],
    queryFn: async () => {
      const response = await getUserReservations(userId)
      const reservations =
        response?.data?.reservations || response?.data || response?.reservations || []

      return reservations.map(mapReservation)
    },
    enabled: Boolean(userId),
  })
}
