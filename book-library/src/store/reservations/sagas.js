import { takeLatest, call, put } from "redux-saga/effects";
import { getReservationsList, addReservation, updateReservation } from "./api";
import history from "../../core/history";
import {
  GET_RESERVATIONS_START,
  ADD_RESERVATION_START,
  ADD_RESERVATION_END,
  UPDATE_RESERVATION_START,
  UPDATE_RESERVATION_END,
} from "./actionTypes";
import {
  getReservationsEnd,
  addReservationEnd,
  updateReservationEnd,
} from "./actions";

export function* getReservationsSaga(action) {
  try {
    const apiResult = yield call(getReservationsList, action.payload);
    yield put(getReservationsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* addReservationSaga(action) {
  try {
    const apiResult = yield call(addReservation, action.payload);
    yield put(addReservationEnd(apiResult));
    history.push("/library");
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

export default function* () {
  yield takeLatest(GET_RESERVATIONS_START, getReservationsSaga);
  yield takeLatest(ADD_RESERVATION_START, addReservationSaga);
  yield takeLatest(ADD_RESERVATION_END, getReservationsSaga);
  yield takeLatest(UPDATE_RESERVATION_START, updateReservationSaga);
  yield takeLatest(UPDATE_RESERVATION_END, getReservationsSaga);
}
