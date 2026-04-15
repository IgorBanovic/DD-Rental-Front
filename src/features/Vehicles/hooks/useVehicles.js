import { useQuery } from '@tanstack/react-query'
import { getVehicles } from '@/features/vehicles/api/vehiclesApi'
import { mapVehicle } from '@/utils/vehicleMappers'

export function useVehicles() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const response = await getVehicles()
      const vehicles = response?.data?.cars || response?.data || []
      return vehicles.map(mapVehicle)
    },
  })
}
