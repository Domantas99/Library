import { takeLatest, call, put } from 'redux-saga/effects';
import { getBookList, getBookDetails as getBookApiDetails } from './api';
import { GET_BOOK_LIST_START, GET_BOOK_DETAILS } from './actionTypes';
import { getBookListEnd, getBookDetailsEnd } from './actions';

export function* getBookListSaga(action) {
  try{
    const apiResult = yield call(getBookList);
    yield put(getBookListEnd(apiResult));
  } catch (e) {
    // stops saga from braking on api error
  }
}

export function* getBookDetailsSaga(action) {
    try {
        const apiResult = yield call(getBookApiDetails, action.payload);
        yield put(getBookDetailsEnd(apiResult));
    } catch (e) {
        // stops saga from braking on api error
    }
}

export default function* (){
    yield takeLatest(GET_BOOK_LIST_START, getBookListSaga);
    yield takeLatest(GET_BOOK_DETAILS, getBookDetailsSaga);
}