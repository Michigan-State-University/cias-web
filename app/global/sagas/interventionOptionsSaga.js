import { sendInterventionCsvSaga } from 'global/reducers/intervention';
import {
  archiveInterventionSaga,
  copyInterventionSaga,
} from 'global/reducers/interventions';
import { all } from 'redux-saga/effects';

export function* interventionOptionsSaga() {
  yield all([
    sendInterventionCsvSaga(),
    copyInterventionSaga(),
    archiveInterventionSaga(),
  ]);
}
