/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from "redux-saga/effects";
import { getMocked, getMockedById, getTest } from "./api";
import { GET_MOCKED, GET_MOCKED_ID, GET_TEST } from "./actionTypes";
import { mockedByIdLoaded, mockedLoaded, testLoaded } from "./actions";

export function* getTestSaga(action) {
  try {
    const apiResult = yield call(getTest);

    yield put(testLoaded(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getMockedSaga(action) {
  try {
    const apiResult = yield call(getMocked);

    yield put(mockedLoaded(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getMockedByIdSaga(action) {
  try {
    const apiResult = yield call(getMockedById, action.payload);

    yield put(mockedByIdLoaded(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_TEST, getTestSaga);
  yield takeLatest(GET_MOCKED, getMockedSaga);
  yield takeLatest(GET_MOCKED_ID, getMockedByIdSaga);
}
