import { GET_RESERVATIONS_START, GET_RESERVATIONS_END } from "./actionTypes";

export const getReservations = () => ({ type: GET_RESERVATIONS_START });
export const getReservationsEnd = (reservationsList) => ({
  type: GET_RESERVATIONS_END,
  payload: reservationsList,
});
