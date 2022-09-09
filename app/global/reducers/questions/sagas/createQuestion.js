import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import omit from 'lodash/omit';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { feedbackQuestion } from 'models/Session/QuestionTypes';
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
import { GroupType } from 'models/QuestionGroup';
import { CharacterType } from 'models/Character';
import { groupQuestionsSuccess } from 'global/reducers/questionGroups/actions';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';

import globalMessages from 'global/i18n/globalMessages';
import {
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_GROUP_REQUEST,
} from '../constants';
import {
  createQuestionSuccess,
  createQuestionError,
  createQuestionsSuccess,
} from '../actions';
import { makeSelectQuestions, makeSelectSelectedQuestion } from '../selectors';
import { getNewGroupPosition, prepareNewGroupQuestions } from '../utils';

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
  const newQuestion = {
    ...question,
    narrator: {
      blocks,
      settings: { ...narrator, character: CharacterType.PEEDY },
    },
  };

  const selectedQuestionGroupType = groups.find(
    ({ id }) => id === selectedQuestion.question_group_id,
  )?.type;

  const groupId =
    selectedQuestionGroupType === GroupType.PLAIN
      ? selectedQuestion.question_group_id
      : null;

  if (isNullOrUndefined(groupId)) {
    yield call(
      createNewQuestionGroup,
      sessionId,
      groups,
      [newQuestion],
      GroupType.PLAIN,
      position,
    );
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

function* createQuestionGroup({ payload: { sessionId, groupType } }) {
  const groups = yield select(makeSelectQuestionGroups());

  const {
    settings: { narrator },
  } = yield select(makeSelectSession());

  const questions = prepareNewGroupQuestions(
    groupType,
    formatMessage,
    narrator,
  );

  yield call(
    createNewQuestionGroup,
    sessionId,
    groups,
    questions,
    groupType,
    {
      x: 0,
      y: 0,
    },
    formatMessage(globalMessages.defaultTlfbGroupName),
  );
}

function* createNewQuestionGroup(
  sessionId,
  groups,
  questions,
  groupType,
  position,
  groupName,
) {
  try {
    const requestURL = `v1/sessions/${sessionId}/question_groups`;

    const newGroupPosition = getNewGroupPosition(groups);

    const { data } = yield axios.post(requestURL, {
      question_group: {
        title: groupName || `Group ${newGroupPosition}`,
        questions,
        type: groupType,
      },
    });

    const newGroup = jsonApiToObject(data, 'questionGroup');

    const groupWithoutQuestions = omit(newGroup, 'questions');
    yield put(groupQuestionsSuccess(groupWithoutQuestions, []));

    const newQuestions = newGroup.questions.map((question) =>
      objectKeysToSnakeCase(question, ['sha256', 'endPosition']),
    );

    if (!isNullOrUndefined(newQuestions) && newQuestions.length) {
      yield put(createQuestionsSuccess(newQuestions));
      yield put(setAnimationStopPosition(position.x, position.y));
    } else {
      yield put(createQuestionError());
    }
  } catch (error) {
    yield put(createQuestionError(error));
  }
}

export default function* createQuestionSaga() {
  yield takeLatest(CREATE_QUESTION_REQUEST, createQuestion);
  yield takeLatest(CREATE_QUESTION_GROUP_REQUEST, createQuestionGroup);
}
