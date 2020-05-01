import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_COMMENTS_START,
  GET_BOOK_COMMENTS_START,
  ADD_COMMENT_START,
  ADD_COMMENT_END,
} from "./actionTypes";
import { getComments, getBookComments, addComment } from "./api";
import { getCommentsEnd, getBookCommentsEnd, addCommentEnd } from "./actions";

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
    if (action.type === GET_BOOK_COMMENTS_START) {
      const apiResult = yield call(getBookComments, action.payload);
      yield put(getBookCommentsEnd(apiResult));
    } else if (action.type === ADD_COMMENT_END) {
      const apiResult = yield call(
        getBookComments,
        action.payload.returnResult.bookId
      );
      yield put(getBookCommentsEnd(apiResult));
    }
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* addCommentSaga(action) {
  try {
    const apiResult = yield call(addComment, action.payload);
    yield put(addCommentEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_COMMENTS_START, getCommentsSaga);
  yield takeLatest(GET_BOOK_COMMENTS_START, getBookCommentsSaga);
  yield takeLatest(ADD_COMMENT_START, addCommentSaga);
  yield takeLatest(ADD_COMMENT_END, getBookCommentsSaga);
}
