/* eslint-disable no-unused-vars */
import { call, put, takeLatest } from "redux-saga/effects";
import { getCategoriesAPI } from "./api";
import { GET_CATEGORIES } from "./actionTypes";
import { ADD_NEW_BOOK_END } from "../library/actionTypes";
import { categoriesLoaded } from "./actions";

export function* getCategoriesSaga(action) {
  try {
    const apiResult = yield call(getCategoriesAPI);
    yield put(categoriesLoaded(apiResult));
  } catch (ex) {
    //
  }
}

export default function* () {
  yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
  yield takeLatest(ADD_NEW_BOOK_END, getCategoriesSaga);
}
