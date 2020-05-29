/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getUserApi,
  login,
  updateUserApi,
  logoutApi,
  registrationApi,
  pingAuthApi,
} from './api';
import {
  GET_USER,
  LOGIN,
  UPDATE_USER,
  UPDATE_USER_END,
  LOGIN_END,
  LOGOUT,
  REGISTER_END,
  REGISTER,
  PING_AUTH,
} from './actionTypes';
import {
  getUserEnd,
  loginEnd,
  registerEnd,
  isAuthEnd,
  authError,
} from './actions';
import history from '../../core/history';

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
    yield put(getUserEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* loginSaga(action) {
  try {
    const apiResult = yield call(login, action.payload);
    yield put(loginEnd(apiResult));
    yield put(isAuthEnd());
    history.push('/');
  } catch (e) {
    // console.log(e);
  }
}

export function* registerSaga(action) {
  try {
    const apiResult = yield call(registrationApi, action.payload);
    yield put(registerEnd(apiResult));
    yield put(isAuthEnd());
    history.push('/');
  } catch (e) {
    // console.log(e);
  }
}

export function* logoutSaga(action) {
  try {
    yield call(logoutApi);
    history.push('/login');
  } catch (e) {
    // exception
  }
}

export function* pingAuthSaga(action) {
  try {
    yield call(pingAuthApi);
    yield put(isAuthEnd());
  } catch (e) {
    yield put(authError());
    history.push('/login');
  }
}

export default function* () {
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(LOGIN_END, getUserSaga);
  yield takeLatest(REGISTER_END, getUserSaga);
  yield takeLatest(UPDATE_USER_END, getUserSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(PING_AUTH, pingAuthSaga);
}
