/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from 'redux-saga/effects';
import history from '../../core/history';
import { getLatestBooksAPI, getCurrentlyReadingBooksAPI } from './api';
import {
  GET_LATEST_BOOKS,
  GET_LATEST_BOOKS_END,
  GET_CURRENTLY_READING_BOOKS,
  GET_CURRENTLY_READING_BOOKS_END,
} from './actionTypes';
import { getLatestBooksEnd, getCurrentlyReadingBooksEnd } from './actions';

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
    const apiResult = yield call(getCurrentlyReadingBooksAPI);
    yield put(getCurrentlyReadingBooksEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_LATEST_BOOKS, getLatestBooksSaga);
  yield takeLatest(GET_CURRENTLY_READING_BOOKS, getCurrentlyReadingBooksSaga);
}
