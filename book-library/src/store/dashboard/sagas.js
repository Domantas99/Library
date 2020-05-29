/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getCurrentlyReadingBooksAPI,
  getLatestBooksAPI,
  getRecommendedBooksAPI,
} from './api';
import {
  GET_CURRENTLY_READING_BOOKS,
  GET_LATEST_BOOKS,
  GET_RECOMMENDED_BOOKS,
} from './actionTypes';
import {
  getCurrentlyReadingBooksEnd,
  getLatestBooksEnd,
  getRecommendedBooksEnd,
} from './actions';
import {
  ADD_RESERVATION_END,
  CHECK_IN_RESERVATION_END,
} from '../reservations/actionTypes';

export function* getCurrentlyReadingBooksSaga(action) {
  try {
    const apiResult = yield call(getCurrentlyReadingBooksAPI);
    yield put(getCurrentlyReadingBooksEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getLatestBooksSaga(action) {
  try {
    const apiResult = yield call(getLatestBooksAPI, 4);
    yield put(getLatestBooksEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getRecommendedBooksSaga(action) {
  try {
    const apiResult = yield call(getRecommendedBooksAPI, 12);
    yield put(getRecommendedBooksEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(ADD_RESERVATION_END, getCurrentlyReadingBooksSaga);
  yield takeLatest(CHECK_IN_RESERVATION_END, getCurrentlyReadingBooksSaga);
  yield takeLatest(GET_CURRENTLY_READING_BOOKS, getCurrentlyReadingBooksSaga);
  yield takeLatest(GET_LATEST_BOOKS, getLatestBooksSaga);
  yield takeLatest(GET_RECOMMENDED_BOOKS, getRecommendedBooksSaga);
  yield takeLatest(CHECK_IN_RESERVATION_END, getRecommendedBooksSaga);
  yield takeLatest(CHECK_IN_RESERVATION_END, getLatestBooksSaga);
}
