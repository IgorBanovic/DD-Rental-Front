import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusMessage from '@/components/ui/StatusMessage'
import ReservationSummary from '@/features/reservations/components/ReservationSummary'
import { useCreateReservation } from '@/features/reservations/hooks/useCreateReservation'

function getDateAfter(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

function ReservationForm({ carId, userId, dailyPrice }) {
  const navigate = useNavigate()
  const [pickupDate, setPickupDate] = useState(() => getDateAfter(2))
  const [returnDate, setReturnDate] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const createReservationMutation = useCreateReservation()

  const pickup = pickupDate ? new Date(pickupDate) : null
  const dropoff = returnDate ? new Date(returnDate) : null
  const timeDifference = pickup && dropoff ? dropoff - pickup : 0
  const totalDays = timeDifference > 0 ? Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) : 0
  const totalPrice = totalDays * Number(dailyPrice || 0)

  function handleSubmit(event) {
    event.preventDefault()

    if (!pickupDate || !returnDate || !userId) {
      return
    }

    createReservationMutation.mutate(
      {
        user_id: userId,
        car_id: carId,
        start_date: pickupDate,
        end_date: returnDate,
      },
      {
        onSuccess: () => {
          setPickupDate(getDateAfter(2))
          setReturnDate('')
          setShowSuccessModal(true)
        },
      }
    )
  }

  return (
    <>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h2 className="reservation-form__title">Book Now</h2>

        <label className="reservation-form__label" htmlFor="pickup-date">
          Pickup Date
        </label>
        <input
          id="pickup-date"
          type="date"
          className="reservation-form__input"
          value={pickupDate}
          onChange={(event) => setPickupDate(event.target.value)}
        />

        <label className="reservation-form__label" htmlFor="return-date">
          Return Date
        </label>
        <input
          id="return-date"
          type="date"
          className="reservation-form__input"
          value={returnDate}
          onChange={(event) => setReturnDate(event.target.value)}
        />

        <ReservationSummary totalDays={totalDays} totalPrice={totalPrice} />

        <button
          type="submit"
          className="reservation-form__button"
          disabled={createReservationMutation.isPending}
        >
          {createReservationMutation.isPending ? 'Creating reservation...' : 'Confirm Reservation'}
        </button>

        {createReservationMutation.isError ? (
          <StatusMessage tone="error">{createReservationMutation.error.message}</StatusMessage>
        ) : null}

        {!userId ? (
          <StatusMessage tone="error">You must be logged in to make a reservation.</StatusMessage>
        ) : null}
      </form>

      {showSuccessModal ? (
        <div className="reservation-modal__backdrop" role="presentation">
          <div
            className="reservation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-success-title"
          >
            <h3 id="reservation-success-title" className="reservation-modal__title">
              Reservation successful
            </h3>
            <p className="reservation-modal__text">
              Your booking has been created successfully. You can review it now in your dashboard.
            </p>

            <div className="reservation-modal__actions">
              <button
                type="button"
                className="reservation-modal__button reservation-modal__button--secondary"
                onClick={() => setShowSuccessModal(false)}
              >
                Stay here
              </button>
              <button
                type="button"
                className="reservation-modal__button"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ReservationForm
