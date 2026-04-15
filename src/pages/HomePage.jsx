import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Find Your Perfect Ride</h1>
        <p className="hero__text">
          Rent a vehicle quickly and easily. Browse available cars, compare options, and book the
          one that fits your trip.
        </p>

        <div className="hero__buttons">
          <Link to="/vehicles" className="hero__btn hero__btn--primary">
            Browse Vehicles
          </Link>
          <Link to="/register" className="hero__btn hero__btn--secondary">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomePage
