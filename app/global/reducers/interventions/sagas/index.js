import { all } from 'redux-saga/effects';
import fetchInterventionsSaga from 'global/reducers/interventions/sagas/fetchInterventions';
import copyInterventionSaga from 'global/reducers/interventions/sagas/copyIntervention';
import archiveInterventionSaga from 'global/reducers/interventions/sagas/archiveIntervention';

export {
  fetchInterventionsSaga,
  copyInterventionSaga,
  archiveInterventionSaga,
};

export default function* allProblemSagas() {
  yield all([
    fetchInterventionsSaga(),
    copyInterventionSaga(),
    archiveInterventionSaga(),
  ]);
}
