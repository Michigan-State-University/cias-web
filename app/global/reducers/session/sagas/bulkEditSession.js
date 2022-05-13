import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';

import { BULK_EDIT_SESSION_REQUEST } from '../constants';
import { editSessionSuccess, editSessionError } from '../actions';
import { makeSelectSession } from '../selectors';
import messages from '../messages';

export function* bulkEditSession({ payload: { session: editedSession } } = {}) {
  const session = yield select(makeSelectSession());

  const requestURL = `v1/interventions/${
    session.intervention_id ?? session.interventionId
  }/sessions/${session.id}`;

  try {
    const { data } = yield call(axios.put, requestURL, {
      session: objectKeysToSnakeCase(editedSession),
    });

    yield put(editSessionSuccess(jsonApiToObject(data, 'session')));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.editSessionError));
    yield put(editSessionError(error));
  }
}

export default function* bulkEditSessionSaga() {
  yield takeLatest(BULK_EDIT_SESSION_REQUEST, bulkEditSession);
}
