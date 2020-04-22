import { all, fork } from "redux-saga/effects";
import { sagas as librarySagas } from "./library";
import { sagas as wishlistSagas } from "./wishlist";
import { sagas as searchbarSagas } from "./search-bar";
import { sagas as categoriesSagas } from "./categories";
import { sagas as dashboardSagas } from "./dashboard";
import { sagas as officeSagas } from "./office";

export default function* sagas() {
  yield all([
    fork(librarySagas),
    fork(searchbarSagas),
    fork(categoriesSagas),
    fork(wishlistSagas),
    fork(dashboardSagas),
    fork(officeSagas),
  ]);
}
