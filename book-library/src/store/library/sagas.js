import { takeLatest, call, put } from 'redux-saga/effects';
import { getBookList } from './api';
import { GET_BOOK_LIST_START } from './actionTypes';
import { getBookListEnd } from './actions';

export function* getBookListSaga(action) {
  try{
    const apiResult = yield call(getBookList);
    yield put(getBookListEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* (){
  yield takeLatest(GET_BOOK_LIST_START, getBookListSaga);
}