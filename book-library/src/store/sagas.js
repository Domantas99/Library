import { all, fork } from 'redux-saga/effects';
import { sagas as testSagas } from './test';
import { sagas as librarySagas } from './library';
import { sagas as searchbarSagas } from './search-bar';

export default function* sagas() {
  yield all([fork(testSagas), fork(librarySagas), fork(searchbarSagas)]);
}
