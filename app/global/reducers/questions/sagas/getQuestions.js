import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { setAnimationStopPosition } from 'global/reducers/localState';

import { GET_QUESTIONS_REQUEST } from '../constants';
import { getQuestionsSuccess, getQuestionsError } from '../actions';

function* getQuestions({ payload: { id } }) {
  const requestURL = `v1/interventions/${id}/questions`;

  try {
    const response = yield axios.get(requestURL);
    const questions = response.data.data.map(question =>
      mapQuestionToStateObject(question),
    );
    const sortedQuestions = sortBy(questions, 'position');
    yield put(getQuestionsSuccess(sortedQuestions));
    if (!isEmpty(sortedQuestions) && sortedQuestions[0].narrator.blocks[0]) {
      const position = sortedQuestions[0].narrator.blocks[0].endPosition;
      yield put(setAnimationStopPosition(position.x, position.y));
    }
  } catch (error) {
    yield put(getQuestionsError(error));
  }
}

export default function* getQuestionsSaga() {
  yield takeLatest(GET_QUESTIONS_REQUEST, getQuestions);
}
