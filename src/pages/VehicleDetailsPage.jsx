import { useParams } from 'react-router-dom'
import StatusMessage from '@/components/ui/StatusMessage'
import { useAuth } from '@/features/auth'
import { ReservationForm } from '@/features/reservations'
import { useVehicle, VehicleDetailsView } from '@/features/vehicles'

function VehicleDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const { data: vehicle, isLoading, isError, error } = useVehicle(id)

  if (isLoading) {
    return <StatusMessage>Loading vehicle...</StatusMessage>
  }

  if (isError) {
    return <StatusMessage tone="error">{error.message}</StatusMessage>
  }

  if (!vehicle) {
    return <StatusMessage tone="error">Vehicle not found.</StatusMessage>
  }

  return (
    <VehicleDetailsView
      vehicle={vehicle}
      reservationForm={
        <ReservationForm carId={vehicle.id} userId={user?.id} dailyPrice={vehicle.price} />
      }
    />
  )
}

export default VehicleDetailsPage
