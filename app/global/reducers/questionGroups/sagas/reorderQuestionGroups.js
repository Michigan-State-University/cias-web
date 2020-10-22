import { put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  REORDER_GROUP_LIST_ERROR,
  REORDER_GROUP_LIST_REQUEST,
} from '../constants';
import { makeSelectQuestionGroups } from '../selectors';
import { reorderGroupListError, reorderGroupListSuccess } from '../actions';

import messages from '../messages';

function* reorderQuestionGroups({ payload: { interventionId } }) {
  const groups = yield select(makeSelectQuestionGroups());
  const requestURL = `/v1/interventions/${interventionId}/question_groups/position`;

  try {
    yield axios.patch(requestURL, {
      question_groups: groups.map(({ id, position }) => ({
        id,
        position,
      })),
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
