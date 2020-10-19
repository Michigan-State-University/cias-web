import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  REORDER_GROUP_LIST_ERROR,
  REORDER_GROUP_LIST_REQUEST,
} from '../constants';
import { reorderGroupListError, reorderGroupListSuccess } from '../actions';

import messages from '../messages';

function* reorderQuestionGroups({
  payload: { interventionId, groupId, destinationIndex },
}) {
  const requestURL = `/v1/interventions/${interventionId}/question_groups/position`;

  try {
    yield axios.patch(requestURL, {
      question_groups: {
        id: groupId,
        position: destinationIndex,
      },
    });

    yield put(reorderGroupListSuccess());
  } catch (error) {
    yield put(
      showError(formatMessage(messages.reorderError), {
        id: REORDER_GROUP_LIST_ERROR,
      }),
    );
    yield put(reorderGroupListError(error));
  }
}

export default function* reorderQuestionGroupsSaga() {
  yield takeLatest(REORDER_GROUP_LIST_REQUEST, reorderQuestionGroups);
}
