import { Link } from 'react-router-dom'
import { formatCurrency } from '@/utils/formatCurrency'

function VehicleCard({ vehicle }) {
  return (
    <div className="vehicle-card">
      <img src={vehicle.image} alt={vehicle.name} className="vehicle-card__image" />

      <div className="vehicle-card__body">
        <h2 className="vehicle-card__title">{vehicle.displayName}</h2>
        <p className="vehicle-card__text">Year: {vehicle.year}</p>
        <p className="vehicle-card__price">{formatCurrency(vehicle.price)} / day</p>

        <Link to={`/vehicles/${vehicle.id}`} className="vehicle-card__button">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default VehicleCard
