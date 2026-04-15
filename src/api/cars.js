export async function getCars() {
    const res = await fetch("http://127.0.0.1:8000/api/cars", {
        headers: {
            "Accept": "application/json",
        },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch cars");
    }

    return data;
}

export async function getCar(id) {
    const res = await fetch(`http://127.0.0.1:8000/api/cars/${id}`, {
        headers: {
            Accept: "application/json",
        },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch vehicle");
    }

    return data;
}