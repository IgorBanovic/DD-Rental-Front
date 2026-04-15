import useAuthStore from "../store/authStore";

export async function getUserReservations(userId) {
    const token = useAuthStore.getState().token;

    const res = await fetch(
        `http://127.0.0.1:8000/api/users/${userId}/reservations`,
        {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to fetch reservations");
    }

    return data;
}

export async function cancelReservation(reservationId) {
    const token = useAuthStore.getState().token;

    const res = await fetch(
        `http://127.0.0.1:8000/api/reservations/${reservationId}`,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || data.error || "Failed to cancel reservation");
    }

    return true;
}