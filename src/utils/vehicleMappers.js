import { STORAGE_BASE_URL } from '@/lib/env'

export function mapVehicle(vehicle) {
  const imagePath = vehicle?.image ? `${STORAGE_BASE_URL}/${vehicle.image}` : ''
  const displayName = vehicle?.name || [vehicle?.brand, vehicle?.model].filter(Boolean).join(' ')

  return {
    ...vehicle,
    image: imagePath,
    displayName: displayName || 'Vehicle',
  }
}
