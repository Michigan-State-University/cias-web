import { select, put, takeLatest } from '@redux-saga/core/effects';

import { Intervention } from 'models/Intervention';

import { matchResearchersInterventionPaths } from 'utils/router';

import { RoutePath } from 'global/constants';
import { getSessionRequest } from 'global/reducers/session/actions';
import {
  fetchReportTemplatesRequest,
  fetchSingleReportTemplateRequest,
} from 'global/reducers/reportTemplates/actions';
import { makeSelectSelectedReportId } from 'global/reducers/reportTemplates/selectors';
import { fetchTextMessagesRequest } from 'global/reducers/textMessages/actions';
import { getQuestionGroupsRequest } from 'global/reducers/questionGroups/actions';

import { REFRESH_INTERVENTION_DATA } from '../constants';
import { fetchInterventionRequest, refreshInterventionData } from '../actions';
import {
  makeSelectIntervention,
  makeSelectIsCurrentUserEditor,
} from '../selectors';

function* refreshInterventionDataWorker({
  payload: { interventionId, forCurrentEditorToo },
}: ReturnType<typeof refreshInterventionData>) {
  const intervention: Nullable<Intervention> = yield select(
    makeSelectIntervention(),
  );

  if (!intervention || interventionId !== intervention.id) return;

  const match = matchResearchersInterventionPaths();
  if (!match) return;

  if (!forCurrentEditorToo) {
    const isCurrentUserEditor: boolean = yield select(
      makeSelectIsCurrentUserEditor(),
    );
    if (isCurrentUserEditor) return;
  }

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

export default function* refreshInterventionDataSaga() {
  yield takeLatest(REFRESH_INTERVENTION_DATA, refreshInterventionDataWorker);
}

export const withRefreshInterventionDataSaga = {
  key: 'refreshInterventionSaga',
  saga: refreshInterventionDataSaga,
};
