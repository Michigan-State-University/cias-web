import { sendInterventionCsvSaga } from 'global/reducers/intervention';
import {
  archiveInterventionSaga,
  copyInterventionSaga,
} from 'global/reducers/interventions';
import { all } from 'redux-saga/effects';

export function* problemOptionsSaga() {
  yield all([
    sendInterventionCsvSaga(),
    copyInterventionSaga(),
    archiveInterventionSaga(),
  ]);
}
