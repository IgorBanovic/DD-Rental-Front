import VehicleCard from "../components/VehicleCard";

const cars = [
    {
        id: 1,
        name: "BMW 3 Series",
        year: 2022,
        price: 65,
        image: "https://www.alloyhub.com/wp-content/uploads/2021/10/e90-600x600.png",
    },
    {
        id: 2,
        name: "Audi A4",
        year: 2021,
        price: 60,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSELwrPOWSU0tOwZQFS7653dCuPVol_njvNXA&s",
    },
    {
        id: 3,
        name: "Mercedes C-Class",
        year: 2023,
        price: 75,
        image: "https://braybrooks.co.uk/wp-content/uploads/2015/02/c-class-205-e1586175998660.jpg",
    },
];

function Vehicles() {
    return (
        <section className="vehicles">
            <h1 className="vehicles__title">Available Vehicles</h1>
            <p className="vehicles__subtitle">
                Choose from our range of comfortable and reliable vehicles.
            </p>

            <div className="vehicles__grid">
                {cars.map((car) => (
                    <VehicleCard key={car.id} car={car} />
                ))}
            </div>
        </section>
    );
}

export default Vehicles;