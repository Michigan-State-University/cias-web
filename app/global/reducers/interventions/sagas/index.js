import { all } from 'redux-saga/effects';
import fetchInterventionsSaga from './fetchInterventions';
import copyInterventionSaga from './copyIntervention';
import archiveInterventionSaga from './archiveIntervention';

export {
  fetchInterventionsSaga,
  copyInterventionSaga,
  archiveInterventionSaga,
};

export default function* allInterventionSagas() {
  yield all([
    fetchInterventionsSaga(),
    copyInterventionSaga(),
    archiveInterventionSaga(),
  ]);
}
