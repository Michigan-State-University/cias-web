import { all } from 'redux-saga/effects';
import fetchInterventionsSaga from './fetchInterventions';

export { fetchInterventionsSaga };

export default function* allInterventionsSagas() {
  yield all([fetchInterventionsSaga()]);
}
