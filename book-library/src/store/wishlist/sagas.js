/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from "redux-saga/effects";
import { getWishlist, addWishAPI } from "./api";
import { GET_WISHLIST_START, ADD_WISH, ADD_WISH_END } from "./actionTypes";
import { getWishlistEnd, setWishlistModal, addWishEnd } from "./actions";

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
    const apiResult = yield call(addWishAPI);
    if (!apiResult.error) {
      yield put(addWishEnd(apiResult));
      // Closes the modal after put;
      yield put(setWishlistModal(false));
    }
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_WISHLIST_START, getWishlistSaga);
  yield takeLatest(ADD_WISH, addWishSaga);
  // Refreshes wishlist
  yield takeLatest(ADD_WISH_END, getWishlistSaga);
}
