import { select, takeEvery, put } from '@redux-saga/core/effects';

import { matchResearchersInterventionPaths } from 'utils/router';

import { RoutePath } from 'global/constants';
import { getSessionRequest } from 'global/reducers/session';
import { fetchReportTemplatesRequest } from 'global/reducers/reportTemplates';

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

  const match = matchResearchersInterventionPaths();

  if (!match) return;

  yield put(fetchInterventionRequest(interventionId, true));
  const { sessionId } = match.params;

  switch (match.path) {
    case RoutePath.EDIT_SESSION: {
      yield put(
        getSessionRequest({
          interventionId,
          sessionId,
        }),
      );
      yield put(fetchReportTemplatesRequest(sessionId, interventionId));
      break;
    }
    case RoutePath.SESSION_SETTINGS: {
      yield put(
        getSessionRequest({
          interventionId,
          sessionId,
        }),
      );
      break;
    }
    default:
      break;
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
