import StatusMessage from '@/components/ui/StatusMessage'
import { useAuth } from '@/features/auth'
import { ReservationCard, useCancelReservation, useUserReservations } from '@/features/reservations'

function DashboardPage() {
  const { user } = useAuth()
  const { data: reservations = [], isLoading, isError, error } = useUserReservations(user?.id)
  const cancelMutation = useCancelReservation(user?.id)

  if (!user) {
    return <StatusMessage>Please log in to view your reservations.</StatusMessage>
  }

  if (isLoading) {
    return <StatusMessage>Loading reservations...</StatusMessage>
  }

  if (isError) {
    return <StatusMessage tone="error">{error.message}</StatusMessage>
  }

  return (
    <section className="dashboard">
      <h1 className="dashboard__title">My Reservations</h1>
      <p className="dashboard__subtitle">View and manage your current bookings.</p>

      <div className="dashboard__list">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              isCancelling={cancelMutation.isPending}
              onCancel={(reservationId) => cancelMutation.mutate(reservationId)}
            />
          ))
        ) : (
          <StatusMessage>No reservations found.</StatusMessage>
        )}
      </div>
    </section>
  )
}

export default DashboardPage
