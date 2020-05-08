import { takeLatest, call, put } from "redux-saga/effects";
import {
  getReservationsList,
  addReservation,
  updateReservation,
  getBookReservations,
  removeReservationAPI,
} from "./api";

import {
  GET_RESERVATIONS_START,
  GET_BOOK_RESERVATIONS_START,
  ADD_RESERVATION_START,
  ADD_RESERVATION_END,
  UPDATE_RESERVATION_START,
  UPDATE_RESERVATION_END,
  REMOVE_RESERVATION_START,
} from "./actionTypes";
import {
  getReservationsEnd,
  addReservationEnd,
  updateReservationEnd,
  getBookReservationsEnd,
  removeReservationEnd,
} from "./actions";

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

export function* addReservationSaga(action) {
  try {
    const apiResult = yield call(addReservation, action.payload);
    const { bookId } = apiResult.returnResult.bookCase;
    const { userId } = apiResult.returnResult;
    yield put(addReservationEnd({ bookId, userId }));
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

export function* removeReservationSaga(action) {
  try {
    const apiResult = yield call(removeReservationAPI, action.payload);
    yield put(
      removeReservationEnd({
        bookId: apiResult.returnResult.id,
        userId: action.userId,
      })
    );
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_RESERVATIONS_START, getReservationsSaga);
  yield takeLatest(GET_BOOK_RESERVATIONS_START, getBookReservationsSaga);
  yield takeLatest(ADD_RESERVATION_START, addReservationSaga);
  yield takeLatest(ADD_RESERVATION_END, getReservationsSaga);
  yield takeLatest(UPDATE_RESERVATION_START, updateReservationSaga);
  yield takeLatest(UPDATE_RESERVATION_END, getReservationsSaga);
  yield takeLatest(REMOVE_RESERVATION_START, removeReservationSaga);
}
