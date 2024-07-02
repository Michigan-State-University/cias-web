import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import { BULK_EDIT_SESSION_REQUEST } from '../constants';
import {
  editSessionSuccess,
  editSessionError,
  updateNarratorSuccess,
} from '../actions';
import { makeSelectSession } from '../selectors';
import messages from '../messages';

export function* bulkEditSession({
  payload: { session: editedSession, options },
} = {}) {
  const session = yield select(makeSelectSession());

  const interventionId = session.intervention_id ?? session.interventionId;

  const requestURL = `v1/interventions/${interventionId}/sessions/${session.id}`;
  const narratorChangeURL = `${requestURL}/change_narrator`;

  try {
    if (editedSession.currentNarrator) {
      yield call(axios.post, narratorChangeURL, {
        narrator: {
          name: editedSession.currentNarrator,
          replaced_animations: options?.replacementAnimations || {},
        },
      });
      yield put(updateNarratorSuccess());
      return;
    }

    const { data } = yield call(axios.put, requestURL, {
      session: objectKeysToSnakeCase(editedSession),
    });

    yield put(editSessionSuccess(jsonApiToObject(data, 'session')));
  } catch (error) {
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.editSessionError),
    );
    yield put(editSessionError(error));
  }
}

export default function* bulkEditSessionSaga() {
  yield takeLatest(BULK_EDIT_SESSION_REQUEST, bulkEditSession);
}
