/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from 'redux-saga/effects';
import history from '../../core/history';
import {
  addBookAPI,
  deleteBookApi,
  getAuthors,
  getCategories,
  getBookAvailabilityAPI,
  getBookList,
  getBookDetails,
  rateBook,
  setBookArchiveStatusAPI,
  updateBook,
} from './api';
import {
  ADD_NEW_BOOK,
  ADD_NEW_BOOK_END,
  DELETE_BOOK,
  DELETE_BOOK_END,
  GET_AUTHORS_START,
  GET_BOOK_AVAILABILITY,
  GET_BOOK_DETAILS_START,
  GET_BOOK_LIST_START,
  GET_CATEGORIES_START,
  RATE_BOOK,
  SELECT_CATEGORY,
  SET_BOOK_ARCHIVE_STATUS_END,
  SET_BOOK_ARCHIVE_STATUS,
  SET_FILTERS_START,
  SET_FILTERS_END,
  UPDATE_BOOK,
  UPDATE_BOOK_END,
} from './actionTypes';
import {
  addNewBookEnd,
  deleteBookEnd,
  getAuthorsEnd,
  getBookAvailabilityEnd,
  getBookDetailsEnd,
  getBookListEnd,
  getCategoriesEnd,
  rateBookEnd,
  setBookArchiveStateEnd,
  setFilters,
  setFiltersEnd,
  updateBookEnd,
} from './actions';
import {
  ADD_RESERVATION_END,
  CHECK_IN_RESERVATION_END,
} from '../reservations/actionTypes';
import { paramGenerator, createToast } from '../../utilities';
import { displayToast } from '../general/actions';

export function* addNewBookSaga(action) {
  try {
    const apiResult = yield call(addBookAPI, action.payload);
    yield put(addNewBookEnd(apiResult));
    history.push('/library');
    const toast = createToast('success', 'Book added successfully');
    yield put(displayToast(toast));
  } catch (e) {
    //
  }
}

export function* deleteBookSaga(action) {
  try {
    const apiResult = yield call(deleteBookApi, action.payload);
    history.push('/library');
    yield put(deleteBookEnd(apiResult));
    const toast = createToast('success', 'Book deleted successfully');
    yield put(displayToast(toast));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getAuthorsSaga(action) {
  try {
    const apiResult = yield call(getAuthors);
    yield put(getAuthorsEnd(apiResult));
  } catch (ex) {
    //
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

export function* getBookDetailsSaga(action) {
  try {
    const apiResult = yield call(getBookDetails, action.payload);
    yield put(getBookDetailsEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getBookListSaga(action) {
  try {
    const apiResult = yield call(getBookList, action.payload);
    yield put(getBookListEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getCategoriesSaga(action) {
  try {
    const apiResult = yield call(getCategories);
    yield put(getCategoriesEnd(apiResult));
  } catch (ex) {
    //
  }
}

export function* rateBookSaga(action) {
  try {
    const apiResult = yield call(rateBook, action.payload);
    yield put(rateBookEnd(apiResult));
  } catch (ex) {
    //
  }
}

export function* selectCategorySaga(action) {
  if (action.payload != null) {
    const newCategory = Array.isArray(action.payload)
      ? action.payload
      : [action.payload];
    yield put(setFilters({ category: newCategory }));
  } else {
    yield put(setFilters({}));
  }
}

export function* setBookArchiveStateSaga(action) {
  try {
    const apiResult = yield call(setBookArchiveStatusAPI, action.payload);
    yield put(setBookArchiveStateEnd(action.payload.bookId));
    const status = apiResult.isArchived === true ? 'arhived' : 'unarchived';
    const toast = createToast('success', `Book ${status} successfully`);
    yield put(displayToast(toast));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* setFiltersSaga(action) {
  const params = paramGenerator(action.payload);
  let newRoute =
    window.location.pathname.split('?')[0] + params ? `?${params}` : '';
  if (newRoute.slice(-1) === '/') {
    newRoute = newRoute.slice(0, -1);
  }
  if (newRoute !== window.location.pathname) {
    history.replace(newRoute);
  }
  yield put(setFiltersEnd(action.payload));
}

export function* updateBookSaga(action) {
  try {
    const apiResult = yield call(updateBook, action.payload);
    history.push(`/library/${action.payload.id}`);
    yield put(updateBookEnd(apiResult));
    const toast = createToast('success', 'Book updated successfully');
    yield put(displayToast(toast));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(ADD_NEW_BOOK, addNewBookSaga);
  yield takeLatest(ADD_NEW_BOOK_END, getBookListSaga);
  yield takeLatest(ADD_NEW_BOOK_END, getCategoriesSaga);
  yield takeLatest(ADD_RESERVATION_END, getBookDetailsSaga);
  yield takeLatest(CHECK_IN_RESERVATION_END, getBookDetailsSaga);
  yield takeLatest(DELETE_BOOK, deleteBookSaga);
  yield takeLatest(DELETE_BOOK_END, getBookListSaga);
  yield takeLatest(DELETE_BOOK_END, getCategoriesSaga);
  yield takeLatest(GET_AUTHORS_START, getAuthorsSaga);
  yield takeLatest(GET_BOOK_AVAILABILITY, getBookAvailabilitySaga);
  yield takeLatest(GET_BOOK_DETAILS_START, getBookDetailsSaga);
  yield takeLatest(GET_BOOK_LIST_START, getBookListSaga);
  yield takeLatest(GET_CATEGORIES_START, getCategoriesSaga);
  yield takeLatest(RATE_BOOK, rateBookSaga);
  yield takeLatest(SELECT_CATEGORY, selectCategorySaga);
  yield takeLatest(SET_BOOK_ARCHIVE_STATUS, setBookArchiveStateSaga);
  yield takeLatest(SET_BOOK_ARCHIVE_STATUS_END, getBookDetailsSaga);
  yield takeLatest(SET_FILTERS_START, setFiltersSaga);
  yield takeLatest(SET_FILTERS_END, getBookListSaga);
  yield takeLatest(UPDATE_BOOK, updateBookSaga);
  yield takeLatest(UPDATE_BOOK_END, getBookDetailsSaga);
}
