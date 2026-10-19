import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { RA_SESSION } from 'models/Session';

import { REORDER_SESSION_LIST, REORDER_SESSION_LIST_ERROR } from '../constants';
import { reorderSessionsSuccess, reorderSessionsError } from '../actions';
import messages from '../messages';

export function* reorderSessions({
  payload: { interventionId, reorderedList },
}) {
  const requestURL = `v1/interventions/${interventionId}/sessions/position`;
  try {
    const position = reorderedList
      .filter(({ type }) => type !== RA_SESSION)
      .map(({ id, position: sessionPosition }) => ({
        id,
        position: sessionPosition,
      }));
    yield call(axios.patch, requestURL, {
      session: {
        position,
      },
    });
    yield put(reorderSessionsSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.reorderError), {
      toastId: REORDER_SESSION_LIST_ERROR,
    });
    yield put(reorderSessionsError(error));
  }
}

export default function* reorderSessionsSaga() {
  yield takeLatest(REORDER_SESSION_LIST, reorderSessions);
}
