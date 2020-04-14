import { call, put, takeLatest } from 'redux-saga/effects';
import { getCategoriesAPI } from './api';
import { GET_CATEGORIES, GET_CATEGORIES_END } from './actionTypes';
import { categoriesLoaded } from './actions';

export function* getCategoriesSaga(action) {
    try {
        const apiResult = yield call(getCategoriesAPI);
        yield put(categoriesLoaded(apiResult));
    } catch (ex) { }
}

export default function* () {
    yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
}