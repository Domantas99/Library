import { takeLatest, call, put } from 'redux-saga/effects';
import {
  ADD_COMMENT_START,
  ADD_COMMENT_END,
  GET_COMMENTS_START,
  GET_BOOK_COMMENTS_START,
} from './actionTypes';
import { addComment, getComments, getBookComments } from './api';
import { addCommentEnd, getCommentsEnd, getBookCommentsEnd } from './actions';
import { CHECK_IN_RESERVATION_END } from '../reservations/actionTypes';

export function* addCommentSaga(action) {
  try {
    const apiResult = yield call(addComment, action.payload);
    yield put(addCommentEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getCommentsSaga(action) {
  try {
    const apiResult = yield call(getComments);
    yield put(getCommentsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getBookCommentsSaga(action) {
  try {
    const apiResult = yield call(getBookComments, action.payload);
    yield put(getBookCommentsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getBookCommentsAfterAddSaga(action) {
  try {
    const apiResult = yield call(getBookComments, action.payload.bookId);
    yield put(getBookCommentsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getBookCommentsAfterCheckinSaga(action) {
  try {
    const apiResult = yield call(getBookComments, action.payload);
    yield put(getBookCommentsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(ADD_COMMENT_START, addCommentSaga);
  yield takeLatest(ADD_COMMENT_END, getBookCommentsAfterAddSaga);
  yield takeLatest(GET_COMMENTS_START, getCommentsSaga);
  yield takeLatest(GET_BOOK_COMMENTS_START, getBookCommentsSaga);
  yield takeLatest(CHECK_IN_RESERVATION_END, getBookCommentsAfterCheckinSaga);
}
