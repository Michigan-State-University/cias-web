import { all } from 'redux-saga/effects';
import { createInterventionSaga } from 'global/reducers/intervention/sagas';
import {
  editProblemSaga,
  fetchProblemSaga,
} from 'global/reducers/problem/sagas';

export default function* problemDetailsPageSagas() {
  yield all([createInterventionSaga(), fetchProblemSaga(), editProblemSaga()]);
}
