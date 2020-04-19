/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from "redux-saga/effects";
import history from "../../core/history";
import { getBookList, addBookAPI, getBookDetails } from "./api";
import {
  GET_BOOK_LIST_START,
  ADD_NEW_BOOK,
  GET_BOOK_DETAILS_START,
} from "./actionTypes";
import { getBookListEnd, addNewBookEnd, getBookDetailsEnd } from "./actions";

export function* getBookListSaga(action) {
  try {
    const apiResult = yield call(getBookList);
    yield put(getBookListEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* addNewBookSaga(action) {
  try {
    const apiResult = yield call(addBookAPI, action.payload);
    if (!apiResult.error) {
      history.push("/library");
    }
    yield put(addNewBookEnd(apiResult));
  } catch (e) {
    //
  }
}

export function* getBookDetailsSaga(action) {
  try {
    const apiResult = yield call(getBookDetails, action.payload);
    yield put(getBookDetailsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_BOOK_LIST_START, getBookListSaga);
  yield takeLatest(ADD_NEW_BOOK, addNewBookSaga);
  yield takeLatest(GET_BOOK_DETAILS_START, getBookDetailsSaga);
}
