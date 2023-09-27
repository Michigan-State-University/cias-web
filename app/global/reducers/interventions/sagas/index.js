import { all } from 'redux-saga/effects';
import copyInterventionSaga from './copyIntervention';
import archiveInterventionSaga from './archiveIntervention';
import importInterventionSaga from './importIntervention';

export * from './starIntervention';
export * from './unstarIntervention';
export * from './fetchInterventions';

export {
  copyInterventionSaga,
  archiveInterventionSaga,
  importInterventionSaga,
};

export default function* allInterventionSagas() {
  yield all([
    copyInterventionSaga(),
    archiveInterventionSaga(),
    importInterventionSaga(),
  ]);
}
