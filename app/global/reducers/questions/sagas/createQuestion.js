import { put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { feedbackQuestion, finishQuestion } from 'models/Session/QuestionTypes';
import {
  readQuestionBlockType,
  feedbackBlockType,
} from 'models/Narrator/BlockTypes';
import { setAnimationStopPosition } from 'global/reducers/localState';
import { makeSelectQuestionGroups } from 'global/reducers/questionGroups';
import { getNarratorPositionWhenQuestionIsAdded } from 'utils/getNarratorPosition';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { makeSelectSession } from 'global/reducers/session';
import { instantiateBlockForType } from 'models/Session/utils';
import { PlainGroupType } from 'models/Session/GroupTypes';
import omit from 'lodash/omit';
import { groupQuestionsSuccess } from 'global/reducers/questionGroups/actions';
import findLast from 'lodash/findLast';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import { CREATE_QUESTION_REQUEST } from '../constants';
import { createQuestionSuccess, createQuestionError } from '../actions';
import { makeSelectQuestions, makeSelectSelectedQuestion } from '../selectors';

function* createQuestion({ payload: { question, id: sessionId } }) {
  const selectedQuestion = yield select(makeSelectSelectedQuestion());
  const groups = yield select(makeSelectQuestionGroups());
  const groupIds = groups.map(({ id }) => id);

  const questions = yield select(makeSelectQuestions());
  const {
    settings: { narrator },
  } = yield select(makeSelectSession());
  const position = getNarratorPositionWhenQuestionIsAdded(
    questions,
    question,
    groupIds,
  );
  const blocks = [
    instantiateBlockForType(readQuestionBlockType, position, question),
    ...(question.type === feedbackQuestion.id
      ? [instantiateBlockForType(feedbackBlockType, position, question)]
      : []),
  ];
  const newQuestion = { ...question, narrator: { blocks, settings: narrator } };

  const groupId =
    selectedQuestion?.type !== finishQuestion.id
      ? selectedQuestion.question_group_id
      : null;

  if (isNullOrUndefined(groupId)) {
    try {
      const requestURL = `v1/sessions/${sessionId}/question_groups`;

      const lastPlainGroup = findLast(
        groups,
        ({ type }) => type === PlainGroupType,
      );

      const newGroupPosition = isNullOrUndefined(lastPlainGroup)
        ? 1
        : lastPlainGroup.position + 1;

      const { data } = yield axios.post(requestURL, {
        question_group: {
          title: `Group ${newGroupPosition}`,
          questions: [newQuestion],
          type: PlainGroupType,
        },
      });

      const newGroup = jsonApiToObject(data, 'questionGroup');

      const groupWithoutQuestions = omit(newGroup, 'questions');
      yield put(groupQuestionsSuccess(groupWithoutQuestions, []));

      const firstQuestion = newGroup.questions[0];
      const createdQuestion = objectKeysToSnakeCase(firstQuestion, [
        'sha256',
        'endPosition',
      ]);

      if (!isNullOrUndefined(createdQuestion)) {
        yield put(createQuestionSuccess(createdQuestion));
        yield put(setAnimationStopPosition(position.x, position.y));
      } else {
        yield put(createQuestionError());
      }
    } catch (error) {
      yield put(createQuestionError(error));
    }
  } else {
    const requestURL = `v1/question_groups/${groupId}/questions`;

    try {
      const response = yield axios.post(requestURL, newQuestion);

      const createdQuestion = mapQuestionToStateObject(response.data.data);

      yield put(createQuestionSuccess(createdQuestion));

      yield put(setAnimationStopPosition(position.x, position.y));
    } catch (error) {
      yield put(createQuestionError(error));
    }
  }
}

export default function* createQuestionSaga() {
  yield takeLatest(CREATE_QUESTION_REQUEST, createQuestion);
}
