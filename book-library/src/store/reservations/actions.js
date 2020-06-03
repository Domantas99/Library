import {
  ADD_RESERVATION_START,
  ADD_RESERVATION_END,
  ADD_WAITING_START,
  ADD_WAITING_END,
  CHECK_IN_RESERVATION_START,
  CHECK_IN_RESERVATION_END,
  GET_RESERVATIONS_START,
  GET_RESERVATIONS_END,
  GET_BOOK_RESERVATIONS_START,
  GET_BOOK_RESERVATIONS_END,
  GET_TEAM_RESERVATIONS_START,
  GET_TEAM_RESERVATIONS_END,
  REMOVE_WAITING_START,
  REMOVE_WAITING_END,
  SET_FILTERS_START,
  SET_FILTERS_END,
  SET_TEAM_FILTERS_START,
  SET_TEAM_FILTERS_END,
} from './actionTypes';

export const addReservation = (reservation) => ({
  type: ADD_RESERVATION_START,
  payload: reservation,
});
export const addReservationEnd = (bookId) => ({
  type: ADD_RESERVATION_END,
  payload: bookId,
});

export const addWaiting = (waiting) => ({
  type: ADD_WAITING_START,
  payload: waiting,
});
export const addWaitingEnd = (bookId) => ({
  type: ADD_WAITING_END,
  payload: bookId,
});

export const checkInReservation = (reservationId, review) => ({
  type: CHECK_IN_RESERVATION_START,
  payload: { reservationId, review },
});
export const checkInReservationEnd = (bookId) => ({
  type: CHECK_IN_RESERVATION_END,
  payload: bookId,
});

export const getReservations = (filters) => ({
  type: GET_RESERVATIONS_START,
  payload: { filters },
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

export const getTeamReservations = (filters) => ({
  type: GET_TEAM_RESERVATIONS_START,
  payload: filters,
});
export const getTeamReservationsEnd = (reservations) => ({
  type: GET_TEAM_RESERVATIONS_END,
  payload: reservations,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS_START,
  payload: { filters },
});

export const setFiltersEnd = ({ filters }) => ({
  type: SET_FILTERS_END,
  payload: { filters },
});

export const setTeamFilters = (filters) => ({
  type: SET_TEAM_FILTERS_START,
  payload: filters,
});

export const setTeamFiltersEnd = (filters) => ({
  type: SET_TEAM_FILTERS_END,
  payload: filters,
});

export const removeWaiting = (waitingId) => ({
  type: REMOVE_WAITING_START,
  payload: waitingId,
});
export const removeWaitingEnd = (bookId) => ({
  type: REMOVE_WAITING_END,
  payload: bookId,
});

