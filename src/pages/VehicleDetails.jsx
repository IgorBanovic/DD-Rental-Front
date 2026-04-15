import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCar } from "../api/cars";
import { useMutation } from "@tanstack/react-query";
import { createReservation } from "../api/reservations";
import useAuthStore from "../store/authStore";
// import "../components/VehicleCard";

function VehicleDetails() {
    const { id } = useParams();
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const user = useAuthStore((state) => state.user);
    console.log("USER IN VEHICLE DETAILS:", user);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["car", id],
        queryFn: () => getCar(id),
        enabled: !!id,
    });

    const reservationMutation = useMutation({
        mutationFn: createReservation,
        onSuccess: () => {
            alert("Reservation successful!");
            setPickupDate("");
            setReturnDate("");
        },
        onError: (err) => {
            alert(`Reservation failed: ${err.message}`);
        },
    });

    const rawCar = data?.data?.car || data?.data || data;

    const car = rawCar
        ? {
            ...rawCar,
            image: `http://127.0.0.1:8000/storage/${rawCar.image}`,
        }
        : null;


    if (isLoading) {
        return <p>Loading vehicle...</p>;
    }

    if (isError) {
        return <p style={{ color: "red" }}>{error.message}</p>;
    }

    if (!car) {
        return <h1>Vehicle not found</h1>;
    }

    const pickup = pickupDate ? new Date(pickupDate) : null;
    const dropoff = returnDate ? new Date(returnDate) : null;

    const timeDifference =
        pickup && dropoff ? dropoff - pickup : 0;

    const totalDays =
        timeDifference > 0
            ? Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
            : 0;

    const totalPrice = totalDays * Number(car.price || 0);

    const handleReservation = (e) => {
        e.preventDefault();

        console.log("USER BEFORE RESERVATION:", user);

        if (!pickupDate || !returnDate) {
            alert("Please select both dates.");
            return;
        }

        if (!user?.id) {
            alert("You must be logged in to make a reservation.");
            return;
        }

        reservationMutation.mutate({
            user_id: user.id,
            car_id: car.id,
            start_date: pickupDate,
            end_date: returnDate,
        });
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

                    <button type="submit" className="reservation-form__button"
                        disabled={reservationMutation.isPending}>
                        {reservationMutation.isPending ? "Creating reservation..." : "Confirm Reservation"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default VehicleDetails;