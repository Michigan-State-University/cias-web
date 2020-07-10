import { all } from 'redux-saga/effects';
import { authSaga } from '../reducers/auth';

export default function* rootSaga() {
  yield all([authSaga()]);
}
