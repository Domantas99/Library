/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from "redux-saga/effects";
import { getOfficesAPI } from "./api";
import { GET_OFFICES } from "./actionTypes";
import { getOfficesEnd } from "./actions";

export function* getOfficesSaga(action) {
  try {
    const apiResult = yield call(getOfficesAPI);
    yield put(getOfficesEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_OFFICES, getOfficesSaga);
}
