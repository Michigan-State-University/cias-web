import { all } from 'redux-saga/effects';
import tokenSaga from './tokenSaga';

export default function* rootSaga() {
  yield all([tokenSaga()]);
}
