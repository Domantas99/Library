import { all, fork } from 'redux-saga/effects';
import { sagas as librarySagas } from './library';
import { sagas as wishlistSagas } from './wishlist';
import { sagas as searchbarSagas } from './search-bar';
import { sagas as reservationsSagas } from './reservations';
import { sagas as dashboardSagas } from './dashboard';
import { sagas as officeSagas } from './office';
import { sagas as commentSagas } from './comments';
import { sagas as userSagas } from './user';

export default function* sagas() {
  yield all([
    fork(librarySagas),
    fork(searchbarSagas),
    fork(wishlistSagas),
    fork(reservationsSagas),
    fork(dashboardSagas),
    fork(officeSagas),
    fork(commentSagas),
    fork(userSagas),
  ]);
}
