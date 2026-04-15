import { useQuery } from "@tanstack/react-query";
import VehicleCard from "../components/VehicleCard";
import { getCars } from "../api/cars";

function Vehicles() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["cars"],
        queryFn: getCars,
    });

    const cars = (data?.data?.cars || []).map((car) => ({
        ...car,
        image: `http://127.0.0.1:8000/storage/${car.image}`,
    }));

    if (isLoading) {
        return <p>Loading vehicles...</p>;
    }

    if (isError) {
        return <p style={{ color: "red" }}>{error.message}</p>;
    }

    return (
        <section className="vehicles">
            <h1 className="vehicles__title">Available Vehicles</h1>
            <p className="vehicles__subtitle">
                Choose from our range of comfortable and reliable vehicles.
            </p>

            <div className="vehicles__grid">
                {cars.length > 0 ? (
                    cars.map((car) => <VehicleCard key={car.id} car={car} />)
                ) : (
                    <p>No vehicles available.</p>
                )}
            </div>
        </section>
    );
}

export default Vehicles;