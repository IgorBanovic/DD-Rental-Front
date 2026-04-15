import useAuthStore from "../store/authStore";

export async function createReservation(reservationData) {
    const token = useAuthStore.getState().token;

    const res = await fetch("http://127.0.0.1:8000/api/reservations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || data.error || "Reservation failed");
    }

    return data;
}