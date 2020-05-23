/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getUserApi, login, updateUserApi } from './api';
import { GET_USER, LOGIN, UPDATE_USER, UPDATE_USER_END } from './actionTypes';
import { getUserEnd } from './actions';

export function* getUserSaga(action) {
  try {
    const apiResult = yield call(getUserApi);
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

export function* loginSaga(action) {
  try {
    yield call(login, action.payload);
  } catch (e) {
    console.log(e);
  }
}

export default function* () {
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(UPDATE_USER_END, getUserSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(LOGIN, loginSaga);
}
