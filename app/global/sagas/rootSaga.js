import { all } from 'redux-saga/effects';
import { logOutSaga } from '../reducers/auth';

export default function* rootSaga() {
  yield all([logOutSaga()]);
}
