import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  REORDER_INTERVENTION_LIST,
  REORDER_INTERVENTION_LIST_ERROR,
} from '../constants';
import { reorderSessionsSuccess, reorderSessionsError } from '../actions';
import messages from '../messages';

function* reorderSessions({ payload: { problemId, reorderedList } }) {
  const requestURL = `v1/problems/${problemId}/interventions/position`;
  try {
    yield axios.patch(requestURL, {
      intervention: {
        position: reorderedList.map(({ id, position }) => ({ id, position })),
      },
    });
    yield put(reorderSessionsSuccess());
  } catch (error) {
    yield put(
      showError(formatMessage(messages.reorderError), {
        id: REORDER_INTERVENTION_LIST_ERROR,
      }),
    );
    yield put(reorderSessionsError(error));
  }
}

export default function* reorderSessionsSaga() {
  yield takeLatest(REORDER_INTERVENTION_LIST, reorderSessions);
}
