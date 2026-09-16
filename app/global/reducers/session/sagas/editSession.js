import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import pickFields from 'utils/pickFields';
import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import { makeSelectSessionById } from 'global/reducers/intervention';

import { EDIT_SESSION_REQUEST } from '../constants';

import { editSessionSuccess, editSessionError } from '../actions';
import { makeSelectSession } from '../selectors';
import messages from '../messages';

export function* editSession({ fields, payload: { sessionId } } = {}) {
  const session = sessionId
    ? yield select(makeSelectSessionById(sessionId))
    : yield select(makeSelectSession());

  const requestURL = `v1/interventions/${
    session.intervention_id ?? session.interventionId
  }/sessions/${sessionId ?? session.id}`;

  const patchDifference = pickFields(session, fields);

  const isSessionVariableUpdate = fields && fields.includes('variable');

  try {
    const { data } = yield call(axios.put, requestURL, {
      session: patchDifference,
    });

    yield put(editSessionSuccess(jsonApiToObject(data, 'session')));

    if (isSessionVariableUpdate) {
      yield call(
        toast.success,
        formatMessage(messages.sessionVariableUpdateQueued),
        {
          toastId: 'session-variable-update-queued',
          autoClose: 5000,
        },
      );
    }
  } catch (error) {
    if (error.response?.status === 422 && isSessionVariableUpdate) {
      yield call(
        toast.warning,
        error.response?.data?.message ||
          formatMessage(messages.sessionVariableUpdateInProgress),
        {
          toastId: 'session-variable-update-in-progress',
          autoClose: 5000,
        },
      );
    } else {
      yield call(
        toast.error,
        formatApiErrorMessage(error, messages.editSessionError),
      );
    }
    yield put(editSessionError(error));
  }
}

export default function* editSessionSaga() {
  yield takeLatest(EDIT_SESSION_REQUEST, editSession);
}
