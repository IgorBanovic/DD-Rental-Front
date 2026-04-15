import { formatCurrency } from '@/utils/formatCurrency'

function VehicleDetailsView({ vehicle, reservationForm }) {
  return (
    <section className="vehicle-details">
      <img src={vehicle.image} alt={vehicle.name} className="vehicle-details__image" />

      <div className="vehicle-details__content">
        <h1 className="vehicle-details__title">{vehicle.displayName}</h1>
        <p className="vehicle-details__text">Year: {vehicle.year}</p>
        <p className="vehicle-details__text">Price: {formatCurrency(vehicle.price)} / day</p>
        <p className="vehicle-details__description">{vehicle.description}</p>
        {reservationForm}
      </div>
    </section>
  )
}

export default VehicleDetailsView
