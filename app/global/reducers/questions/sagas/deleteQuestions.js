import { takeLatest, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { makeSelectQuestions } from 'global/reducers/questions/selectors';
import { cleanGroups } from 'global/reducers/questionGroups/actions';

import messages from '../messages';
import {
  DELETE_QUESTIONS_REQUEST,
  DELETE_QUESTIONS_ERROR,
  DELETE_QUESTIONS_SUCCESS,
} from '../constants';
import { deleteQuestionsSuccess, deleteQuestionsError } from '../actions';

function* deleteQuestions({ payload: { questionIds, sessionId } }) {
  const requestURL = `v1/sessions/${sessionId}/delete_questions`;
  const questions = yield select(makeSelectQuestions());

  try {
    yield call(axios.delete, requestURL, { data: { ids: questionIds } });
    yield put(deleteQuestionsSuccess());
    yield put(cleanGroups(questions));
    yield call(
      toast.success,
      formatMessage(messages.deleteSuccess, { count: questionIds.length }),
      {
        id: DELETE_QUESTIONS_SUCCESS,
      },
    );
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.deleteError, { count: questionIds.length }),
      {
        id: DELETE_QUESTIONS_ERROR,
      },
    );

    yield put(deleteQuestionsError(error));
  }
}

export default function* deleteQuestionsSaga() {
  yield takeLatest(DELETE_QUESTIONS_REQUEST, deleteQuestions);
}
