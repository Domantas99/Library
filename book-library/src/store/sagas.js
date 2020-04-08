import { all, fork } from 'redux-saga/effects';
import { sagas as testSagas } from './test';
import { sagas as librarySagas } from './library';
import { sagas as wishlistSagas } from './wishlist';
import { sagas as searchbarSagas } from './search-bar';

export default function* sagas() {
  yield all([fork(testSagas), fork(librarySagas), fork(wishlistSagas), fork(searchbarSagas)]);
}
