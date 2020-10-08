import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';

import { getQuestionsSuccess } from 'global/reducers/questions/actions';
import { setAnimationStopPosition } from 'global/reducers/localState';

import { GET_QUESTION_GROUPS_REQUEST } from '../constants';
import { getQuestionsGroupsError, getQuestionGroupsSuccess } from '../actions';

function* getQuestionsGroups({ payload: { interventionId } }) {
  const groupURL = `/v1/interventions/${interventionId}/questions_groups`;

  try {
    const {
      data: { questions_groups: groups },
    } = yield axios.get(groupURL);
    const questions = flatten(
      groups.map(({ questions: groupQuestions }) => groupQuestions),
    );
    const sortedQuestions = sortBy(questions, 'position');
    yield put(getQuestionsSuccess(sortedQuestions));
    if (!isEmpty(sortedQuestions) && sortedQuestions[0].narrator.blocks[0]) {
      const position = sortedQuestions[0].narrator.blocks[0].endPosition;
      yield put(setAnimationStopPosition(position.x, position.y));
    }
    yield put(getQuestionGroupsSuccess(groups));
  } catch (error) {
    console.log(error);
    yield put(getQuestionsGroupsError(error));
  }
}

export default function* getQuestionsGroupsSaga() {
  yield takeLatest(GET_QUESTION_GROUPS_REQUEST, getQuestionsGroups);
}
