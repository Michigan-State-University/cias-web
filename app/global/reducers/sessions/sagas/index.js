import { all } from 'redux-saga/effects';
import fetchSessionsSaga from 'global/reducers/sessions/sagas/fetchSessions';

export { fetchSessionsSaga };

export default function* allInterventionsSagas() {
  yield all([fetchSessionsSaga()]);
}
