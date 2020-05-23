/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getUserApi, updateUserApi } from './api';
import { GET_USER, UPDATE_USER, UPDATE_USER_END } from './actionTypes';
import { getUserEnd } from './actions';

export function* getUserSaga(action) {
  try {
    const apiResult = yield call(getUserApi, action.payload);
    yield put(getUserEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}
export function* updateUserSaga(action) {
  try {
    const apiResult = yield call(updateUserApi, action.payload);
    yield put(getUserEnd(apiResult.id));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(UPDATE_USER_END, getUserSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
}
