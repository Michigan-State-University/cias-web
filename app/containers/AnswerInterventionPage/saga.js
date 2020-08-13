import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import omit from 'lodash/omit';
import map from 'lodash/map';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';

import { informationQuestion } from 'models/Intervention/QuestionTypes';
import { FETCH_QUESTIONS, SUBMIT_ANSWER_REQUEST } from './constants';
import {
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  submitAnswerSuccess,
  submitAnswerFailure,
  setQuestionIndex,
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

function* submitAnswersAsync({
  payload: { answerId, nextQuestionIndex, required, type: questionType },
}) {
  const answers = yield select(makeSelectAnswers());
  const { answerBody } = answers[answerId];
  let data = map(answerBody, singleBody => omit(singleBody, 'index')); // index is needed to remember the selected answers, but useless in request
  if (data.length || !required) {
    if (!data.length) {
      data = [
        {
          payload: '',
          value: '',
          var: '',
        },
      ];
    }
    if (questionType !== informationQuestion.id) {
      const type = questionType.replace('Question', 'Answer');
      yield axios.post(`/v1/questions/${answerId}/answers`, {
        answer: { type, body: { data } },
      });
    }
    yield put(submitAnswerSuccess(answerId));
    yield put(setQuestionIndex(nextQuestionIndex));
  } else {
    yield put(submitAnswerFailure(answerId, 'Choose answer'));
  }
}

// Individual exports for testing
export default function* answerInterventionPageSaga() {
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsAsync);
  yield takeLatest(SUBMIT_ANSWER_REQUEST, submitAnswersAsync);
}
