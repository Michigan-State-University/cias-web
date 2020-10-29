import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { makeSelectQuestions } from 'global/reducers/questions/selectors';
import {
  REORDER_GROUP_LIST_ERROR,
  REORDER_GROUP_LIST_REQUEST,
} from '../constants';
import { makeSelectQuestionGroups } from '../selectors';
import {
  cleanGroups,
  reorderGroupListError,
  reorderGroupListSuccess,
} from '../actions';

import messages from '../messages';

function* reorderQuestionGroups({ payload: { interventionId } }) {
  const groups = yield select(makeSelectQuestionGroups());
  const questions = yield select(makeSelectQuestions());
  const requestURL = `/v1/interventions/${interventionId}/question_groups/position`;

  try {
    yield axios.patch(requestURL, {
      question_group: {
        position: groups.map(({ id, position }) => ({
          id,
          position,
        })),
      },
    });

    yield put(cleanGroups(questions));
    yield put(reorderGroupListSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.reorderError), {
      toastId: REORDER_GROUP_LIST_ERROR,
    });
    yield put(reorderGroupListError(error));
  }
}

export default function* reorderQuestionGroupsSaga() {
  yield takeLatest(REORDER_GROUP_LIST_REQUEST, reorderQuestionGroups);
}
