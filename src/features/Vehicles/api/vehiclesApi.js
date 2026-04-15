import { apiClient } from '@/lib/apiClient'

export function getVehicles() {
  return apiClient('/cars')
}

export function getVehicle(id) {
  return apiClient(`/cars/${id}`)
}
