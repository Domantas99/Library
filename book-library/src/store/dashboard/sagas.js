/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from 'redux-saga/effects';
import history from '../../core/history';
import { getLatestBooksAPI, getCurrentlyReadingBooksAPI, getRecommendedBooksAPI } from './api';
import {
  GET_LATEST_BOOKS,
  GET_CURRENTLY_READING_BOOKS,
  GET_RECOMMENDED_BOOKS,
} from './actionTypes';
import { getLatestBooksEnd, getCurrentlyReadingBooksEnd, getRecommendedBooksEnd } from './actions';
import { REMOVE_RESERVATION_END, ADD_RESERVATION_END } from '../reservations/actionTypes';

export function* getLatestBooksSaga(action) {
  try {
    const apiResult = yield call(getLatestBooksAPI, action.payload);
    yield put(getLatestBooksEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getCurrentlyReadingBooksSaga(action) {
  try {
    const apiResult = yield call(getCurrentlyReadingBooksAPI, action.payload);
    yield put(getCurrentlyReadingBooksEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getRecommendedBooksSaga(action) {
  try {
    const apiResult = yield call(getRecommendedBooksAPI, action.payload);
    yield put(getRecommendedBooksEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_LATEST_BOOKS, getLatestBooksSaga);
  yield takeLatest(GET_CURRENTLY_READING_BOOKS, getCurrentlyReadingBooksSaga);
  yield takeLatest(ADD_RESERVATION_END, getCurrentlyReadingBooksSaga);
  yield takeLatest(REMOVE_RESERVATION_END, getCurrentlyReadingBooksSaga);
  yield takeLatest(GET_RECOMMENDED_BOOKS, getRecommendedBooksSaga);

}
