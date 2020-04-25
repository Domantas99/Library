import { takeLatest, call, put } from "redux-saga/effects";
import { GET_COMMENTS_START } from "./actionTypes";
import { getComments } from "./api";
import { getCommentsEnd } from "./actions";

export function* getCommentsSaga(action) {
    try {
      const apiResult = yield call(getComments, action.payload);
      yield put(getCommentsEnd(apiResult));
    } catch (e) {
      // stops saga from braking on api error
    }
}
  
export default function* () {
    yield takeLatest(GET_COMMENTS_START, getCommentsSaga);
}