import {
  GET_RESERVATIONS_START,
  GET_RESERVATIONS_END,
  ADD_RESERVATION_START,
  ADD_RESERVATION_END,
  UPDATE_RESERVATION_START,
  UPDATE_RESERVATION_END,
} from "./actionTypes";

export const getReservations = () => ({ type: GET_RESERVATIONS_START });
export const getReservationsEnd = (reservationsList) => ({
  type: GET_RESERVATIONS_END,
  payload: reservationsList,
});

export const addReservation = (reservation) => ({
  type: ADD_RESERVATION_START,
  payload: reservation,
});
export const addReservationEnd = () => ({ type: ADD_RESERVATION_END });

export const updateReservation = (reservation) => ({
  type: UPDATE_RESERVATION_START,
  payload: reservation,
});
export const updateReservationEnd = () => ({ type: UPDATE_RESERVATION_END });
