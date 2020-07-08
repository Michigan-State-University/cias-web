import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';

import { FETCH_QUESTIONS, SUBMIT_ANSWER_REQUEST } from './constants';
import {
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  submitAnswerSuccess,
  submitAnswerFailure,
} from './actions';
import { makeSelectAnswers } from './selectors';

function* fetchQuestionsAsync({ payload: { interventionId } }) {
  try {
    const {
      data: { data },
    } = yield axios.get(`/v1/interventions/${interventionId}/questions`);
    yield put(
      fetchQuestionsSuccess(
        data.map(question => mapQuestionToStateObject(question)),
      ),
    );
  } catch (error) {
    yield put(fetchQuestionsFailure(error));
  }
}

function* submitAnswersAsync({ payload: { answerId } }) {
  const answers = yield select(makeSelectAnswers());
  const { variable, type: questionType, answer } = answers[answerId];
  if (questionType) {
    const type = questionType.replace('Question', 'Answer');
    yield axios.post(`/v1/questions/${answerId}/answers`, {
      answer: { type, body: [{ payload: answer, var: variable }] },
    });
    yield put(submitAnswerSuccess(answerId));
  } else {
    yield put(submitAnswerFailure(answerId, 'Choose answer'));
  }
}

// Individual exports for testing
export default function* answerInterventionPageSaga() {
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsAsync);
  yield takeLatest(SUBMIT_ANSWER_REQUEST, submitAnswersAsync);
}
