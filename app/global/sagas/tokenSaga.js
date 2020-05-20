import { put, takeEvery, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setToken } from '../reducers/auth';

function* tokenAssign({ payload: { token } }) {
  yield put(setToken(token));
  yield put(push('/'));
}

export default function* tokenSaga() {
  yield takeEvery(action => /_SUCCESS$/.test(action.type), tokenAssign);
}
