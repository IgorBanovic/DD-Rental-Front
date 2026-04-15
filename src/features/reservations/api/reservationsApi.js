import { apiClient } from '@/lib/apiClient'

export function createReservation(payload) {
  return apiClient('/reservations', {
    method: 'POST',
    authenticated: true,
    body: payload,
  })
}

export function getUserReservations(userId) {
  return apiClient(`/users/${userId}/reservations`, {
    authenticated: true,
  })
}

export function cancelReservation(reservationId) {
  return apiClient(`/reservations/${reservationId}`, {
    method: 'DELETE',
    authenticated: true,
  })
}
