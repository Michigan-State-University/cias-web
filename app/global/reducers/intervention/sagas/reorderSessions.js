import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { REORDER_SESSION_LIST, REORDER_SESSION_LIST_ERROR } from '../constants';
import { reorderSessionsSuccess, reorderSessionsError } from '../actions';
import messages from '../messages';

export function* reorderSessions({
  payload: { interventionId, reorderedList },
}) {
  const requestURL = `v1/interventions/${interventionId}/sessions/position`;
  try {
    yield call(axios.patch, requestURL, {
      session: {
        position: reorderedList.map(({ id, position }) => ({ id, position })),
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
