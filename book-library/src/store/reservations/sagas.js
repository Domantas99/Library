import { takeLatest, call, put } from "redux-saga/effects";
import { getReservationsList } from "./api";
import { GET_RESERVATIONS_START } from "./actionTypes";
import { getReservationsEnd } from "./actions";

export function* getReservationsSaga(action) {
  try {
    const apiResult = yield call(getReservationsList);
    yield put(getReservationsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_RESERVATIONS_START, getReservationsSaga);
}
