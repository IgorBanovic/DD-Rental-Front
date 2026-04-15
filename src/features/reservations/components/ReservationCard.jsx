import { formatCurrency } from '@/utils/formatCurrency'

function ReservationCard({ reservation, isCancelling, onCancel }) {
  return (
    <div className="reservation-card">
      <div className="reservation-card__top">
        <h2 className="reservation-card__car">{reservation.car}</h2>
        <span className="reservation-card__status">{reservation.status}</span>
      </div>

      <p className="reservation-card__text">Pickup: {reservation.pickupDate}</p>
      <p className="reservation-card__text">Return: {reservation.returnDate}</p>
      <p className="reservation-card__price">Total: {formatCurrency(reservation.totalPrice)}</p>

      <div className="reservation-card__actions">
        <button
          className="reservation-card__button reservation-card__button--danger"
          onClick={() => onCancel(reservation.id)}
          disabled={isCancelling}
        >
          {isCancelling ? 'Cancelling...' : 'Cancel'}
        </button>
      </div>
    </div>
  )
}

export default ReservationCard
