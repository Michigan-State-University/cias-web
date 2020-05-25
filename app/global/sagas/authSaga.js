import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setToken } from '../reducers/auth';

function* tokenAssign({ payload }) {
  yield put(setToken(payload));
  yield put(push('/'));
}

export default function* authDataSaga() {
  yield takeEvery(action => /_SUCCESS$/.test(action.type), tokenAssign);
}
