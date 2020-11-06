/* eslint-disable camelcase */
import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { makeSelectQuestions } from 'global/reducers/questions/selectors';
import { cleanGroups } from 'global/reducers/questionGroups';
import messages from '../messages';
import {
  REORDER_QUESTION_LIST_REQUEST,
  REORDER_QUESTION_LIST_ERROR,
} from '../constants';
import {
  reorderQuestionListSuccess,
  reorderQuestionListError,
} from '../actions';

function* reorderQuestions({ payload: { interventionId } }) {
  const questions = yield select(makeSelectQuestions());
  const requestURL = `v1/interventions/${interventionId}/questions/move`;

  try {
    yield axios.patch(requestURL, {
      question: {
        position: questions.map(({ id, position, question_group_id }) => ({
          id,
          position,
          question_group_id,
        })),
      },
    });

    yield put(cleanGroups(questions));
    yield put(reorderQuestionListSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.reorderError), {
      toastId: REORDER_QUESTION_LIST_ERROR,
    });
    yield put(reorderQuestionListError(error));
  }
}

export default function* reorderQuestionsSaga() {
  yield takeLatest(REORDER_QUESTION_LIST_REQUEST, reorderQuestions);
}
