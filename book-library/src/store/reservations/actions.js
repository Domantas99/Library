import {
  ADD_RESERVATION_START,
  ADD_RESERVATION_END,
  ADD_WAITING_START,
  ADD_WAITING_END,
  GET_RESERVATIONS_START,
  GET_RESERVATIONS_END,
  GET_BOOK_RESERVATIONS_START,
  GET_BOOK_RESERVATIONS_END,
  GET_TEAM_RESERVATIONS_START,
  GET_TEAM_RESERVATIONS_END,
  REMOVE_RESERVATION_START,
  REMOVE_RESERVATION_END,
  REMOVE_WAITING_START,
  REMOVE_WAITING_END,
  SET_FILTERS_START,
  SET_FILTERS_END,
  SET_TEAM_FILTERS_START,
  SET_TEAM_FILTERS_END,
  UPDATE_RESERVATION_START,
  UPDATE_RESERVATION_END,
} from './actionTypes';

export const addReservation = (reservation) => ({
  type: ADD_RESERVATION_START,
  payload: reservation,
});
export const addReservationEnd = (ids) => ({
  type: ADD_RESERVATION_END,
  payload: ids,
});

export const addWaiting = (waiting) => ({
  type: ADD_WAITING_START,
  payload: waiting,
});

export const addWaitingEnd = () => ({
  type: ADD_WAITING_END,
});

export const getReservations = (id, filters) => ({
  type: GET_RESERVATIONS_START,
  payload: { id, filters },
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
  payload: filters,
});

export const setFiltersEnd = (filters) => ({
  type: SET_FILTERS_END,
  payload: filters,
});

export const setTeamFilters = (filters) => ({
  type: SET_TEAM_FILTERS_START,
  payload: filters,
});

export const setTeamFiltersEnd = (filters) => ({
  type: SET_TEAM_FILTERS_END,
  payload: filters,
});

export const removeWaiting = (waitingId, userId) => ({
  type: REMOVE_WAITING_START,
  payload: waitingId,
  userId,
});
export const removeWaitingEnd = (ids) => ({
  type: REMOVE_WAITING_END,
  payload: ids,
});

export const removeReservation = (reservationId, userId) => ({
  type: REMOVE_RESERVATION_START,
  payload: reservationId,
  userId,
});
export const removeReservationEnd = (ids) => ({
  type: REMOVE_RESERVATION_END,
  payload: ids,
});

export const updateReservation = (reservation) => ({
  type: UPDATE_RESERVATION_START,
  payload: reservation,
});
export const updateReservationEnd = () => ({ type: UPDATE_RESERVATION_END });
