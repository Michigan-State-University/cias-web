import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { cleanGroups } from 'global/reducers/questionGroups';
import {
  DELETE_QUESTION_ERROR,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTIONS_SUCCESS,
} from '../constants';
import { deleteQuestionError, deleteQuestionSuccess } from '../actions';
import messages from '../messages';
import { makeSelectQuestions } from '../selectors';

function* deleteQuestion({ payload: { questionId, sessionId } }) {
  const requestURL = `v1/sessions/${sessionId}/delete_questions`;

  try {
    yield call(axios.delete, requestURL, { data: { ids: [questionId] } });
    const questions = yield select(makeSelectQuestions());
    yield put(cleanGroups(questions));

    yield put(deleteQuestionSuccess());
    yield call(
      toast.success,
      formatMessage(messages.deleteSuccess, { count: 1 }),
      {
        id: DELETE_QUESTIONS_SUCCESS,
      },
    );
  } catch (error) {
    yield call(toast.error, formatMessage(messages.deleteError, { count: 1 }), {
      toastId: DELETE_QUESTION_ERROR,
    });
    yield put(deleteQuestionError(error));
  }
}

export default function* deleteQuestionSaga() {
  yield takeLatest(DELETE_QUESTION_REQUEST, deleteQuestion);
}
