import { put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { ADD_BLOCK } from 'containers/Interventions/components/QuestionSettings/Settings/constants';
import { feedbackQuestion, finishQuestion } from 'models/Session/QuestionTypes';
import {
  readQuestionBlockType,
  feedbackBlockType,
} from 'models/Narrator/BlockTypes';
import { setAnimationStopPosition } from 'global/reducers/localState';
import {
  makeSelectDefaultGroupId,
  createNewQuestionInGroup,
  makeSelectQuestionGroups,
} from 'global/reducers/questionGroups';
import { getNarratorPositionWhenQuestionIsAdded } from 'utils/getNarratorPosition';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { makeSelectSession } from 'global/reducers/session';
import { CREATE_QUESTION_REQUEST } from '../constants';
import {
  createQuestionSuccess,
  createQuestionError,
  updateQuestionSettings,
} from '../actions';
import { makeSelectQuestions, makeSelectSelectedQuestion } from '../selectors';

function* createQuestion({ payload: { question } }) {
  const selectedQuestion = yield select(makeSelectSelectedQuestion());
  const groups = yield select(makeSelectQuestionGroups());
  const groupIds = groups.map(({ id }) => id);
  const defaultGroupId = yield select(makeSelectDefaultGroupId());
  const groupId =
    isNullOrUndefined(selectedQuestion) ||
    selectedQuestion.type === finishQuestion.id
      ? defaultGroupId
      : selectedQuestion.question_group_id;

  const questions = yield select(makeSelectQuestions());
  const {
    settings: { narrator },
  } = yield select(makeSelectSession());
  const requestURL = `v1/question_groups/${groupId}/questions`;
  try {
    const response = yield axios.post(requestURL, {
      ...question,
      narrator: {
        blocks: [],
        settings: narrator,
      },
    });

    const createdQuestion = mapQuestionToStateObject(response.data.data);
    const { id: newQuestionId } = createdQuestion;

    yield put(createQuestionSuccess(createdQuestion));
    yield put(createNewQuestionInGroup(createdQuestion, groupId));
    const position = getNarratorPositionWhenQuestionIsAdded(
      questions,
      createdQuestion,
      groupIds,
    );
    yield put(setAnimationStopPosition(position.x, position.y));
    yield put(
      updateQuestionSettings({
        type: ADD_BLOCK,
        data: {
          type: readQuestionBlockType,
          questionId: newQuestionId,
          groupIds,
        },
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
