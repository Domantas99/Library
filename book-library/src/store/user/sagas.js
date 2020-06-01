/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getUserApi,
  getUserList,
  login,
  logoutApi,
  pingAuthApi,
  registrationApi,
  updateUserApi,
} from './api';
import {
  GET_USER,
  GET_USER_LIST,
  LOGIN,
  LOGIN_END,
  LOGOUT,
  REGISTER,
  REGISTER_END,
  PING_AUTH,
  UPDATE_USER,
  UPDATE_USER_END,
} from './actionTypes';
import {
  authError,
  getUserEnd,
  getUserListEnd,
  isAuthEnd,
  loginEnd,
  registerEnd,
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

export function* getUserListSaga(action) {
  try {
    const apiResult = yield call(getUserList);
    yield put(getUserListEnd(apiResult));
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

export function* logoutSaga(action) {
  try {
    yield call(logoutApi);
    history.push('/login');
  } catch (e) {
    // exception
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

export function* pingAuthSaga(action) {
  try {
    yield call(pingAuthApi);
    yield put(isAuthEnd());
  } catch (e) {
    yield put(authError());
    history.push('/login');
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

export default function* () {
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(GET_USER_LIST, getUserListSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGIN_END, getUserSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(UPDATE_USER_END, getUserSaga);
  yield takeLatest(PING_AUTH, pingAuthSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(REGISTER_END, getUserSaga);
}
