import {
  GET_RESERVATIONS_START,
  GET_RESERVATIONS_END,
  GET_BOOK_RESERVATIONS_START,
  GET_BOOK_RESERVATIONS_END,
  ADD_RESERVATION_START,
  ADD_RESERVATION_END,
  UPDATE_RESERVATION_START,
  UPDATE_RESERVATION_END,
  REMOVE_RESERVATION_START,
  REMOVE_RESERVATION_END,
} from "./actionTypes";

export const getReservations = (id) => ({
  type: GET_RESERVATIONS_START,
  payload: id,
});
export const getReservationsEnd = (reservationsList) => ({
  type: GET_RESERVATIONS_END,
  payload: reservationsList,
});

export const getBookReservations = (id) => ({
  type: GET_BOOK_RESERVATIONS_START,
  payload: id,
});
export const getBookReservationsEnd = (reservations) => ({
  type: GET_BOOK_RESERVATIONS_END,
  payload: reservations,
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

export const removeReservation = (reservationId) => ({
  type: REMOVE_RESERVATION_START,
  payload: reservationId,
});
export const removeReservationEnd = (bookId) => ({
  type: REMOVE_RESERVATION_END,
  payload: bookId,
});
