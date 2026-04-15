import { formatCurrency } from '@/utils/formatCurrency'

function ReservationSummary({ totalDays, totalPrice }) {
  if (totalDays <= 0) {
    return null
  }

  return (
    <div className="reservation-summary">
      <p>Total days: {totalDays}</p>
      <p>Total price: {formatCurrency(totalPrice)}</p>
    </div>
  )
}

export default ReservationSummary
