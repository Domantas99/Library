/* eslint-disable import/no-cycle */
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  ADD_COMMENT_START,
  ADD_COMMENT_END,
  GET_COMMENTS_START,
  GET_BOOK_COMMENTS_START,
  DELETE_COMMENT,
  DELETE_COMMENT_END,
} from './actionTypes';
import { addComment, deleteComment, getComments, getBookComments } from './api';
import {
  addCommentEnd,
  deleteCommentEnd,
  getCommentsEnd,
  getBookCommentsEnd,
} from './actions';
import { CHECK_IN_RESERVATION_END } from '../reservations/actionTypes';

export function* addCommentSaga(action) {
  try {
    /* eslint-disable no-unused-vars */
    const apiResult = yield call(addComment, {
      bookId: action.payload.book,
      comment: action.payload.comment,
    });
    yield put(
      addCommentEnd({
        book: action.payload.book,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
      })
    );
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* deleteCommentSaga(action) {
  try {
    // eslint-disable-next-line no-unused-vars
    const apiResult = yield call(deleteComment, action.payload.id);
    yield put(
      deleteCommentEnd({
        book: action.payload.book,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
      })
    );
  } catch (e) {
    //
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
    const apiResult = yield call(getBookComments, action.payload);
    yield put(getBookCommentsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getBookCommentsAfterCheckinSaga(action) {
  if (window.location.pathname !== '/dashboard') {
    try {
      const apiResult = yield call(getBookComments, { book: action.payload });
      yield put(getBookCommentsEnd(apiResult));
    } catch (e) {
      // stops saga from braking on api error
    }
  }
}

export function* getBookCommentsAfterDeleteSaga(action) {
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
  yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
  yield takeLatest(DELETE_COMMENT_END, getBookCommentsAfterDeleteSaga);
  yield takeLatest(GET_COMMENTS_START, getCommentsSaga);
  yield takeLatest(GET_BOOK_COMMENTS_START, getBookCommentsSaga);
  yield takeLatest(CHECK_IN_RESERVATION_END, getBookCommentsAfterCheckinSaga);
}
