import { useParams } from "react-router-dom";
import { useState } from "react";

const cars = [
    {
        id: 1,
        name: "BMW 3 Series",
        year: 2022,
        price: 65,
        image: "https://www.alloyhub.com/wp-content/uploads/2021/10/e90-600x600.png",
        description: "A comfortable and stylish sedan, perfect for city and business trips.",
    },
    {
        id: 2,
        name: "Audi A4",
        year: 2021,
        price: 60,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSELwrPOWSU0tOwZQFS7653dCuPVol_njvNXA&s",
        description: "A premium vehicle with smooth handling and modern features.",
    },
    {
        id: 3,
        name: "Mercedes C-Class",
        year: 2023,
        price: 75,
        image: "https://braybrooks.co.uk/wp-content/uploads/2015/02/c-class-205-e1586175998660.jpg",
        description: "A luxury car that offers comfort, performance, and elegance.",
    },
];

function VehicleDetails() {
    const { id } = useParams();
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const car = cars.find((item) => item.id === Number(id));

    const pickup = new Date(pickupDate);
    const dropoff = new Date(returnDate);

    const timeDifference = dropoff - pickup;
    const totalDays = timeDifference > 0 ? Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) : 0;
    const totalPrice = totalDays * car.price;

    if (!car) {
        return <h1>Vehicle not found</h1>;
    }

    const handleReservation = (e) => {
        e.preventDefault();

        if (!pickupDate || !returnDate) {
            alert("Please select both dates.");
            return;
        }

        alert(`Reservation requested for ${car.name}`);
    };

    return (
        <section className="vehicle-details">
            <img
                src={car.image}
                alt={car.name}
                className="vehicle-details__image"
            />

            <div className="vehicle-details__content">
                <h1 className="vehicle-details__title">{car.name}</h1>
                <p className="vehicle-details__text">Year: {car.year}</p>
                <p className="vehicle-details__text">Price: €{car.price} / day</p>
                <p className="vehicle-details__description">{car.description}</p>

                <form className="reservation-form" onSubmit={handleReservation}>
                    <h2 className="reservation-form__title">Book Now</h2>

                    <label className="reservation-form__label">Pickup Date</label>
                    <input
                        type="date"
                        className="reservation-form__input"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                    />

                    <label className="reservation-form__label">Return Date</label>
                    <input
                        type="date"
                        className="reservation-form__input"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                    {totalDays > 0 && (
                        <div className="reservation-summary">
                            <p>Total days: {totalDays}</p>
                            <p>Total price: {totalPrice} €</p>
                        </div>
                    )}
                    <button type="submit" className="reservation-form__button">
                        Confirm Reservation
                    </button>
                </form>
            </div>
        </section>
    );
}

export default VehicleDetails;