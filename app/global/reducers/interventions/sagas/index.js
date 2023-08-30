import { all } from 'redux-saga/effects';
import fetchInterventionsSaga from './fetchInterventions';
import copyInterventionSaga from './copyIntervention';
import archiveInterventionSaga from './archiveIntervention';
import importInterventionSaga from './importIntervention';

export * from './starIntervention';
export * from './unstarIntervention';

export {
  fetchInterventionsSaga,
  copyInterventionSaga,
  archiveInterventionSaga,
  importInterventionSaga,
};

export default function* allInterventionSagas() {
  yield all([
    fetchInterventionsSaga(),
    copyInterventionSaga(),
    archiveInterventionSaga(),
    importInterventionSaga(),
  ]);
}
