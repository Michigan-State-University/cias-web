import { put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { ADD_BLOCK } from 'containers/Interventions/components/QuestionSettings/Settings/constants';
import { feedbackQuestion } from 'models/Intervention/QuestionTypes';
import {
  readQuestionBlockType,
  feedbackBlockType,
} from 'models/Narrator/BlockTypes';
import { setAnimationStopPosition } from 'global/reducers/localState';
import { getNarratorPositionWhenQuestionIsAdded } from 'utils/getNarratorPosition';

import { CREATE_QUESTION_REQUEST } from '../constants';
import {
  createQuestionSuccess,
  createQuestionError,
  updateQuestionSettings,
} from '../actions';
import { makeSelectQuestions } from '../selectors';

function* createQuestion({ payload: { question, id } }) {
  const requestURL = `v1/interventions/${id}/questions`;
  const groupURL = `/v1/interventions/${id}/questions_groups`;

  const questions = yield select(makeSelectQuestions());
  try {
    const response = yield axios.post(requestURL, {
      question,
    });
    const {
      data: { questions_groups: groups },
    } = yield axios.get(groupURL);
    console.log(groups);

    const createdQuestion = mapQuestionToStateObject(response.data.data);
    const { id: newQuestionId } = createdQuestion;

    yield put(createQuestionSuccess(createdQuestion));
    const position = getNarratorPositionWhenQuestionIsAdded(
      questions,
      questions.length - 1,
      0,
    );
    yield put(setAnimationStopPosition(position.x, position.y));
    yield put(
      updateQuestionSettings({
        type: ADD_BLOCK,
        data: { type: readQuestionBlockType, questionId: newQuestionId },
      }),
    );

    if (createdQuestion.type === feedbackQuestion.id)
      yield put(
        updateQuestionSettings({
          type: ADD_BLOCK,
          data: { type: feedbackBlockType, questionId: newQuestionId },
        }),
      );
  } catch (error) {
    yield put(createQuestionError(error));
  }
}

export default function* createQuestionSaga() {
  yield takeLatest(CREATE_QUESTION_REQUEST, createQuestion);
}
