/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from "redux-saga/effects";
import { getUserApi } from "./api";
import { GET_USER } from "./actionTypes";
import { getUserEnd } from "./actions";

export function* getOfficesSaga(action) {
  try {
    const apiResult = yield call(getUserApi, action.payload);
    yield put(getUserEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_USER, getOfficesSaga);
}
