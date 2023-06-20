import { select, takeEvery, put } from '@redux-saga/core/effects';

import { matchResearchersInterventionPaths } from 'utils/router';

import { RoutePath } from 'global/constants';
import { getSessionRequest } from 'global/reducers/session';
import {
  fetchReportTemplatesRequest,
  fetchSingleReportTemplateRequest,
  makeSelectSelectedReportId,
} from 'global/reducers/reportTemplates';
import { fetchTextMessagesRequest } from 'global/reducers/textMessages';
import { getQuestionGroupsRequest } from 'global/reducers/questionGroups';

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
    case RoutePath.REPORT_TEMPLATES: {
      yield put(
        getSessionRequest({
          interventionId,
          sessionId,
        }),
      );
      yield put(fetchReportTemplatesRequest(sessionId, interventionId, true));
      const reportId: Nullable<string> = yield select(
        makeSelectSelectedReportId(),
      );
      if (reportId) {
        yield put(
          fetchSingleReportTemplateRequest(reportId, sessionId, interventionId),
        );
      }
      break;
    }
    case RoutePath.TEXT_MESSAGES: {
      yield put(
        getSessionRequest({
          interventionId,
          sessionId,
        }),
      );
      yield put(fetchTextMessagesRequest(sessionId));
      break;
    }
    case RoutePath.SESSION_MAP: {
      yield put(
        getSessionRequest({
          interventionId,
          sessionId,
        }),
      );
      yield put(fetchReportTemplatesRequest(sessionId, interventionId));
      yield put(getQuestionGroupsRequest(sessionId));
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
