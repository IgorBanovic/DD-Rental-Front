import { Link } from "react-router-dom";

function VehicleCard({ car }) {
    return (
        <div className="vehicle-card">
            <img src={car.image} alt={car.name} className="vehicle-card__image" />

            <div className="vehicle-card__body">
                <h2 className="vehicle-card__title">{car.brand}</h2>
                <p className="vehicle-card__text">Year: {car.year}</p>
                <p className="vehicle-card__price">€{car.price} / day</p>

                <Link to={`/vehicles/${car.id}`} className="vehicle-card__button">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default VehicleCard;