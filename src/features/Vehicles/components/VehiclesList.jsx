import StatusMessage from '@/components/ui/StatusMessage'
import VehicleCard from '@/features/vehicles/components/VehicleCard'
import { useVehicles } from '@/features/vehicles/hooks/useVehicles'

function VehiclesList() {
  const { data: vehicles = [], isLoading, isError, error } = useVehicles()

  if (isLoading) {
    return <StatusMessage>Loading vehicles...</StatusMessage>
  }

  if (isError) {
    return <StatusMessage tone="error">{error.message}</StatusMessage>
  }

  return (
    <section className="vehicles">
      <h1 className="vehicles__title">Available Vehicles</h1>
      <p className="vehicles__subtitle">
        Choose from our range of comfortable and reliable vehicles.
      </p>

      <div className="vehicles__grid">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)
        ) : (
          <StatusMessage>No vehicles available.</StatusMessage>
        )}
      </div>
    </section>
  )
}

export default VehiclesList
