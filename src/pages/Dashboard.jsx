import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { getUserReservations, cancelReservation } from "../api/dashboard";

function Dashboard() {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["reservations", user?.id],
        queryFn: () => getUserReservations(user.id),
        enabled: !!user?.id,
    });

    const cancelMutation = useMutation({
        mutationFn: cancelReservation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reservations", user?.id] });
            alert("Reservation cancelled successfully.");
        },
        onError: (error) => {
            alert(error.message || "Failed to cancel reservation.");
        },
    });

    const rawReservations =
        data?.data?.reservations ||
        data?.data ||
        data?.reservations ||
        [];

    const reservations = rawReservations.map((reservation) => {
        const carData = reservation.car || {};
        const carName =
            carData.name ||
            [carData.brand, carData.model].filter(Boolean).join(" ") ||
            reservation.car_name ||
            "Vehicle";

        const pickupDate =
            reservation.pickup_date ||
            reservation.start_date ||
            reservation.pickupDate ||
            "-";

        const returnDate =
            reservation.return_date ||
            reservation.end_date ||
            reservation.returnDate ||
            "-";

        const totalPrice =
            reservation.total_price ||
            reservation.totalPrice ||
            reservation.price ||
            0;

        const status =
            reservation.status || "Pending";

        return {
            id: reservation.id,
            car: carName,
            pickupDate,
            returnDate,
            totalPrice,
            status,
        };
    });

    if (!user) {
        return <p>Please log in to view your reservations.</p>;
    }

    if (isLoading) {
        return <p>Loading reservations...</p>;
    }

    if (isError) {
        return <p style={{ color: "red" }}>{error.message}</p>;
    }

    return (
        <section className="dashboard">
            <h1 className="dashboard__title">My Reservations</h1>
            <p className="dashboard__subtitle">
                View and manage your current bookings.
            </p>

            <div className="dashboard__list">
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
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
                                <button type="secondary" className="reservation-card__button reservation-card__button--secondary">
                                    View
                                </button>
                                <button
                                    className="reservation-card__button reservation-card__button--danger"
                                    onClick={() => cancelMutation.mutate(reservation.id)}
                                    disabled={cancelMutation.isPending}
                                >
                                    {cancelMutation.isPending
                                        ? "Cancelling..."
                                        : "Cancel"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reservations found.</p>
                )}
            </div>
        </section>
    );
}

export default Dashboard;