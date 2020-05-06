/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from "redux-saga/effects";
import { getWishlist, addWishAPI, setVoteAPI, getVoteAPI } from "./api";
import {
  GET_WISHLIST_START,
  ADD_WISH,
  ADD_WISH_END,
  SET_VOTE,
  SET_VOTE_END,
  GET_VOTE,
} from "./actionTypes";
import { getWishlistEnd, addWishEnd, setVoteEnd, getVoteEnd } from "./actions";

export function* getWishlistSaga(action) {
  try {
    const apiResult = yield call(getWishlist);
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
export default function* () {
  yield takeLatest(GET_WISHLIST_START, getWishlistSaga);
  yield takeLatest(ADD_WISH, addWishSaga);
  // Refreshes wishlist
  yield takeLatest(ADD_WISH_END, getWishlistSaga);
  yield takeLatest(SET_VOTE, setVoteSaga);
  yield takeLatest(SET_VOTE_END, getWishlistSaga);
  yield takeLatest(GET_VOTE, getVoteSaga);
}
