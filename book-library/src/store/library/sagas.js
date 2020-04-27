/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from "redux-saga/effects";
import history from "../../core/history";
import {
  getBookList,
  addBookAPI,
  getBookDetails,
  getBookAvailabilityAPI,
  deleteBookApi,
} from "./api";
import {
  GET_BOOK_LIST_START,
  ADD_NEW_BOOK,
  GET_BOOK_DETAILS_START,
  ADD_NEW_BOOK_END,
  GET_BOOK_AVAILABILITY,
  DELETE_BOOK,
  DELETE_BOOK_END,
} from "./actionTypes";
import {
  getBookListEnd,
  addNewBookEnd,
  getBookDetailsEnd,
  getBookAvailabilityEnd,
  deleteBookEnd,
} from "./actions";

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

    yield put(addNewBookEnd(apiResult));
    if (!apiResult.error) {
      history.push("/library");
    }
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

export function* getBookAvailabilitySaga(action) {
  try {
    const apiResult = yield call(getBookAvailabilityAPI, action.payload);
    yield put(getBookAvailabilityEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* deleteBookSaga(action) {
  try {
    const apiResult = yield call(deleteBookApi, action.payload);
    yield put(deleteBookEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_BOOK_LIST_START, getBookListSaga);
  yield takeLatest(ADD_NEW_BOOK_END, getBookListSaga);
  yield takeLatest(ADD_NEW_BOOK, addNewBookSaga);
  yield takeLatest(GET_BOOK_DETAILS_START, getBookDetailsSaga);
  yield takeLatest(GET_BOOK_AVAILABILITY, getBookAvailabilitySaga);
  yield takeLatest(DELETE_BOOK, deleteBookSaga);
  yield takeLatest(DELETE_BOOK_END, getBookListSaga);
}
