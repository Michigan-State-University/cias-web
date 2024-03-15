import {
  sendInterventionCsvSaga,
  deleteSessionSaga,
} from 'global/reducers/intervention';
import { copyInterventionSaga } from 'global/reducers/interventions';
import { all } from 'redux-saga/effects';

export function* interventionOptionsSaga() {
  yield all([
    sendInterventionCsvSaga(),
    copyInterventionSaga(),
    deleteSessionSaga(),
  ]);
}
