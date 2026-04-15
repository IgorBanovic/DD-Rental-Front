import { useQuery } from '@tanstack/react-query'
import { getVehicle } from '@/features/vehicles/api/vehiclesApi'
import { mapVehicle } from '@/utils/vehicleMappers'

export function useVehicle(id) {
  return useQuery({
    queryKey: ['vehicles', id],
    queryFn: async () => {
      const response = await getVehicle(id)
      const rawVehicle = response?.data?.car || response?.data || response
      return rawVehicle ? mapVehicle(rawVehicle) : null
    },
    enabled: Boolean(id),
  })
}
