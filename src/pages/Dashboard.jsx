const reservations = [
    {
        id: 1,
        car: "BMW 3 Series",
        pickupDate: "2026-03-28",
        returnDate: "2026-03-30",
        totalPrice: 130,
        status: "Confirmed",
    },
    {
        id: 2,
        car: "Audi A4",
        pickupDate: "2026-04-02",
        returnDate: "2026-04-05",
        totalPrice: 180,
        status: "Pending",
    },
];

function Dashboard() {
    return (
        <section className="dashboard">
            <h1 className="dashboard__title">My Reservations</h1>
            <p className="dashboard__subtitle">
                View and manage your current bookings.
            </p>

            <div className="dashboard__list">
                {reservations.map((reservation) => (
                    <div className="reservation-card" key={reservation.id}>
                        <div className="reservation-card__top">
                            <h2 className="reservation-card__car">{reservation.car}</h2>
                            <span className="reservation-card__status">
                                {reservation.status}
                            </span>
                        </div>

                        <p className="reservation-card__text">
                            Pickup: {reservation.pickupDate}
                        </p>
                        <p className="reservation-card__text">
                            Return: {reservation.returnDate}
                        </p>
                        <p className="reservation-card__price">
                            Total: €{reservation.totalPrice}
                        </p>

                        <div className="reservation-card__actions">
                            <button className="reservation-card__button reservation-card__button--secondary">
                                View
                            </button>
                            <button className="reservation-card__button reservation-card__button--danger">
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Dashboard;