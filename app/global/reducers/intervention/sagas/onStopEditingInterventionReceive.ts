import { select, takeEvery, put } from '@redux-saga/core/effects';

import { matchResearchersInterventionPaths } from 'utils/router';

import { ON_STOP_EDITING_INTERVENTION_RECEIVE } from '../constants';
import {
  fetchInterventionRequest,
  onStopEditingInterventionReceive,
} from '../actions';
import { makeSelectInterventionId } from '../selectors';

function* onStopEditingInterventionReceiveWorker({
  payload: { interventionId },
}: ReturnType<typeof onStopEditingInterventionReceive>) {
  const currentInterventionId: Nullable<string> = yield select(
    makeSelectInterventionId(),
  );
  if (interventionId !== currentInterventionId) return;

  const isViewingIntervention = matchResearchersInterventionPaths();

  if (isViewingIntervention) {
    yield put(fetchInterventionRequest(interventionId, true));
  }
}

export default function* onStopEditingInterventionReceiveSaga() {
  yield takeEvery(
    ON_STOP_EDITING_INTERVENTION_RECEIVE,
    onStopEditingInterventionReceiveWorker,
  );
}

export const withOnStopEditingInterventionReceiveSaga = {
  key: 'onStopEditingInterventionReceive',
  saga: onStopEditingInterventionReceiveSaga,
};
