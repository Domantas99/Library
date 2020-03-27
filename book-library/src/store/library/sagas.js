import { takeLatest, call, put } from 'redux-saga/effects';
import {getBookList} from './api';
import {GET_BOOK_LIST} from './actionTypes';
import {gotBookList} from './actions';

export function* getBookListSaga(action) {
  try{
    const apiResult = yield call(getBookList);
    yield put(gotBookList(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export default function* (){
  yield takeLatest(GET_BOOK_LIST, getBookListSaga);
}