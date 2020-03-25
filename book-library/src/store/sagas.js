import { all, fork } from 'redux-saga/effects';
import { sagas as testSagas } from './test';
import { sagas as librarySagas } from './library';

export default function* sagas() {
  yield all([fork(testSagas), fork(librarySagas)]);
}
