/* eslint-disable import/no-cycle */
import { takeLatest, call, put } from 'redux-saga/effects';
import history from '../../core/history';
import {
  addReservation,
  addWaiting,
  getBookReservations,
  getReservationsList,
  getTeamReservations,
  checkInReservation,
  removeWaiting,
  updateReservation,
} from './api';
import {
  ADD_RESERVATION_START,
  ADD_RESERVATION_END,
  ADD_WAITING_START,
  ADD_WAITING_END,
  CHECK_IN_RESERVATION_START,
  GET_RESERVATIONS_START,
  GET_BOOK_RESERVATIONS_START,
  GET_TEAM_RESERVATIONS_START,
  REMOVE_WAITING_START,
  REMOVE_WAITING_END,
  SET_FILTERS_START,
  SET_FILTERS_END,
  SET_TEAM_FILTERS_START,
  SET_TEAM_FILTERS_END,
  UPDATE_RESERVATION_START,
  UPDATE_RESERVATION_END,
  CHECK_IN_RESERVATION_END,
} from './actionTypes';
import {
  addReservationEnd,
  addWaitingEnd,
  checkInReservationEnd,
  getReservationsEnd,
  getTeamReservationsEnd,
  getBookReservationsEnd,
  removeWaitingEnd,
  setFiltersEnd,
  setTeamFiltersEnd,
  updateReservationEnd,
} from './actions';
import { paramGenerator } from '../../utilities';

export function* addReservationSaga(action) {
  try {
    yield call(addReservation, action.payload);
    yield put(addReservationEnd(action.payload.bookId));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* addWaitingSaga(action) {
  try {
    yield call(addWaiting, action.payload);
    yield put(addWaitingEnd(action.payload.BookCase.BookId));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* checkInReservationSaga(action) {
  try {
    const apiResult = yield call(checkInReservation, action.payload);
    yield put(checkInReservationEnd(apiResult.id));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getReservationsSaga(action) {
  try {
    const apiResult = yield call(getReservationsList, action.payload);
    yield put(getReservationsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getBookReservationsSaga(action) {
  try {
    const apiResult = yield call(getBookReservations, action.payload);
    yield put(getBookReservationsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getTeamReservationsSaga(action) {
  try {
    const apiResult = yield call(getTeamReservations, action.payload);
    yield put(getTeamReservationsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* removeWaitingSaga(action) {
  try {
    const apiResult = yield call(removeWaiting, action.payload);
    yield put(removeWaitingEnd(apiResult.id));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* updateReservationSaga(action) {
  try {
    const apiResult = yield call(updateReservation, action.payload);
    yield put(updateReservationEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* setFiltersSaga(action) {
  const params = paramGenerator(action.payload.filters);
  let newRoute =
    window.location.pathname.split('?')[0] + params ? `?${params}` : '';
  if (newRoute.slice(-1) === '/') {
    newRoute = newRoute.slice(0, -1);
  }
  if (newRoute !== window.location.pathname) {
    history.replace(newRoute);
  }
  yield put(setFiltersEnd(action.payload));
}

export function* setTeamFiltersSaga(action) {
  const params = paramGenerator(action.payload);
  let newRoute =
    window.location.pathname.split('?')[0] + params ? `?${params}` : '';
  if (newRoute.slice(-1) === '/') {
    newRoute = newRoute.slice(0, -1);
  }
  if (newRoute !== window.location.pathname) {
    history.replace(newRoute);
  }
  yield put(setTeamFiltersEnd(action.payload));
}

export default function* () {
  yield takeLatest(ADD_RESERVATION_START, addReservationSaga);
  yield takeLatest(ADD_RESERVATION_END, getReservationsSaga);
  yield takeLatest(ADD_WAITING_START, addWaitingSaga);
  yield takeLatest(ADD_WAITING_END, getBookReservationsSaga);
  yield takeLatest(CHECK_IN_RESERVATION_START, checkInReservationSaga);
  yield takeLatest(GET_RESERVATIONS_START, getReservationsSaga);
  yield takeLatest(GET_BOOK_RESERVATIONS_START, getBookReservationsSaga);
  yield takeLatest(CHECK_IN_RESERVATION_END, getBookReservationsSaga);
  yield takeLatest(ADD_RESERVATION_END, getBookReservationsSaga);
  yield takeLatest(GET_TEAM_RESERVATIONS_START, getTeamReservationsSaga);
  yield takeLatest(REMOVE_WAITING_START, removeWaitingSaga);
  yield takeLatest(REMOVE_WAITING_END, getBookReservationsSaga);
  yield takeLatest(REMOVE_WAITING_END, getReservationsSaga);
  yield takeLatest(SET_FILTERS_START, setFiltersSaga);
  yield takeLatest(SET_FILTERS_END, getReservationsSaga);
  yield takeLatest(SET_TEAM_FILTERS_START, setTeamFiltersSaga);
  yield takeLatest(SET_TEAM_FILTERS_END, getTeamReservationsSaga);
  yield takeLatest(UPDATE_RESERVATION_START, updateReservationSaga);
  yield takeLatest(UPDATE_RESERVATION_END, getReservationsSaga);
  yield takeLatest(CHECK_IN_RESERVATION_END, getReservationsSaga);
}
