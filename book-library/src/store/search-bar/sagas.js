import { call, put,  debounce } from 'redux-saga/effects';
import { getSeachedBooksAPI } from './api';
import { GET_SEARCHED_BOOKS } from './actionTypes';
import { searchedBooksLoaded } from './actions';


export function* getSeachedBooksSaga(action) {
    try {
        const apiResult = yield call(getSeachedBooksAPI,action.payload);
        yield put(searchedBooksLoaded(apiResult));
    } catch (ex) {
        console.log("Exextion in get searched books:", ex);
    }
}

export default function* () {
    yield debounce(300, GET_SEARCHED_BOOKS, getSeachedBooksSaga);
}