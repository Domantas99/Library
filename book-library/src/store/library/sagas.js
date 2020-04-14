import { takeLatest, call, put } from 'redux-saga/effects';
import { getBookList, addBookAPI } from './api';
import { GET_BOOK_LIST_START, ADD_NEW_BOOK,  } from './actionTypes';
import { getBookListEnd, addNewBookEnd } from './actions';

export function* getBookListSaga(action) {
  try{
    const apiResult = yield call(getBookList);
    yield put(getBookListEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* addNewBookSaga(action) {
  try {
    const apiResult = yield call(addBookAPI, action.payload);
    yield put(addNewBookEnd(apiResult));
  }
  catch (e) { }
}

export default function* (){
  yield takeLatest(GET_BOOK_LIST_START, getBookListSaga);
  yield takeLatest(ADD_NEW_BOOK, addNewBookSaga);
}