import { takeLatest, call, put } from 'redux-saga/effects';
import { getSeachedBooksAPI } from './api';
import { GET_SEARCHED_BOOKS, GET_SEARCHED_BOOKS_END } from './actionTypes';
import { getSearchedBooks, searchedBooksLoaded } from './actions';


export function* getSeachedBooksSaga(action) {
    try {
        const apiResult = yield call(getSeachedBooksAPI,action.payload);
        yield put(searchedBooksLoaded(apiResult));
    } catch (ex) {
        console.log("Exextion in get searched books:", ex);
    }
}

export default function* () {
    yield takeLatest(GET_SEARCHED_BOOKS, getSeachedBooksSaga);
}