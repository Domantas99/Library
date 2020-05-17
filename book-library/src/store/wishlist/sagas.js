/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from "redux-saga/effects";
import history from '../../core/history';
import { getWishlist, addWishAPI, setVoteAPI, getVoteAPI, moveWishToLibraryAPI, getAuthors, getCategories } from "./api";
import { GET_WISHLIST_START, ADD_WISH, ADD_WISH_END, SET_VOTE, SET_VOTE_END, GET_VOTE, MOVE_WISH_TO_LIBRARY, MOVE_WISH_TO_LIBRARY_END, SET_FILTERS_START, SET_FILTERS_END, GET_CATEGORIES_START, GET_AUTHORS_START } from "./actionTypes";
import { getWishlistEnd, addWishEnd, setVoteEnd, getVoteEnd, moveWishToLibraryEnd, setFiltersEnd, getAuthorsEnd, getCategoriesEnd } from "./actions";
import { paramGenerator } from '../../utilities';

export function* getWishlistSaga(action) {
  try {
    const apiResult = yield call(getWishlist, action.payload);
    yield put(getWishlistEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}
export function* addWishSaga(action) {
  try {
    const apiResult = yield call(addWishAPI, action.payload);
    if (!apiResult.error) {
      yield put(addWishEnd(apiResult));
      // Closes the modal after put;
    }
  } catch (e) {
    // stops saga from braking on api error
  }
}
export function* setVoteSaga(action) {
  try {
    const apiResult = yield call(setVoteAPI, action.payload);
    yield put(setVoteEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}
export function* getVoteSaga(action) {
  try {
    const apiResult = yield call(getVoteAPI, action.payload);
    yield put(getVoteEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* moveWishToLibrarySaga(action) {
  try {
    const apiResult = yield call(moveWishToLibraryAPI, action.payload);
    yield put(moveWishToLibraryEnd(apiResult));
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

export function* getCategoriesSaga(action) {
  try {
    const apiResult = yield call(getCategories);
    yield put(getCategoriesEnd(apiResult));
  } catch (ex) {
    //
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

export default function* () {
  yield takeLatest(GET_WISHLIST_START, getWishlistSaga);
  yield takeLatest(ADD_WISH, addWishSaga);
  // Refreshes wishlist
  yield takeLatest(ADD_WISH_END, getWishlistSaga);
  yield takeLatest(SET_VOTE, setVoteSaga);
  yield takeLatest(SET_VOTE_END, getWishlistSaga);
  yield takeLatest(GET_VOTE, getVoteSaga);
  yield takeLatest(MOVE_WISH_TO_LIBRARY, moveWishToLibrarySaga);
  yield takeLatest(MOVE_WISH_TO_LIBRARY_END, getWishlistSaga);
  yield takeLatest(SET_FILTERS_START, setFiltersSaga);
  yield takeLatest(SET_FILTERS_END, getWishlistSaga);
  yield takeLatest(GET_CATEGORIES_START, getCategoriesSaga);
  yield takeLatest(GET_AUTHORS_START, getAuthorsSaga);
}
