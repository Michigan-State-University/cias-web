import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { cleanGroups } from 'global/reducers/questionGroups';
import { DELETE_QUESTION_ERROR, DELETE_QUESTION_REQUEST } from '../constants';
import { deleteQuestionError, deleteQuestionSuccess } from '../actions';
import messages from '../messages';
import { makeSelectQuestions } from '../selectors';

function* deleteQuestion({ payload: { questionId, groupId } }) {
  const requestURL = `v1/question_groups/${groupId}/questions/${questionId}`;

  try {
    yield axios.delete(requestURL);

    const questions = yield select(makeSelectQuestions());
    yield put(cleanGroups(questions));

    yield put(deleteQuestionSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.deleteError), {
      toastId: DELETE_QUESTION_ERROR,
    });
    yield put(deleteQuestionError(error));
  }
}

export default function* deleteQuestionSaga() {
  yield takeLatest(DELETE_QUESTION_REQUEST, deleteQuestion);
}
