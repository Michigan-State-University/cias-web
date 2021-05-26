import { all } from '@redux-saga/core/effects';
import fetchHealthSystemsSaga from './fetchHealthSystems';

export { fetchHealthSystemsSaga };

export default function* allHealthSystemsSagas() {
  yield all([fetchHealthSystemsSaga()]);
}
