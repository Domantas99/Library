/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from "redux-saga/effects";
import { getWishlist } from "./api";
import { GET_WISHLIST_START } from "./actionTypes";
import { getWishlistEnd } from "./actions";

export function* getWishlistSaga(action) {
  try {
    const apiResult = yield call(getWishlist);
    yield put(getWishlistEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* () {
  yield takeLatest(GET_WISHLIST_START, getWishlistSaga);
}
