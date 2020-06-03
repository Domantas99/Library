/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';
import { paramGenerator } from '../../utilities';

export const addReservation = (reservation) => {
  return httpClient.post('reservations', reservation);
};

export const addWaiting = (waiting) => {
  return httpClient.post('reservations/waiting', waiting);
};

export const checkInReservation = ({ reservationId, review }) => {
  return httpClient.post(`reservations/${reservationId}/check-in`, { review });
};

export const getBookReservations = (bookId) => {
  return httpClient.get(`books/${bookId}/reservations`);
};

export const getReservationsList = ( filters ) => {
  let url = `reservations/my-reservations`;
  if (filters) {
    url += `?${paramGenerator(filters)}`;
  }
  return httpClient.get(url);
};

export const getTeamReservations = (params) => {
  let url = 'reservations';
  if (params) {
    url += `?${paramGenerator(params)}`;
  }
  return httpClient.get(url);
};

export const removeWaiting = (waitingId) => {
  return httpClient.delete(`reservations/waiting/${waitingId}`);
};

export const updateReservation = (reservation) => {
  return httpClient.post('reservations', reservation);
};
