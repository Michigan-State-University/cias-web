import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';

import { getQuestionsSuccess } from 'global/reducers/questions/actions';
import { setAnimationStopPosition } from 'global/reducers/localState';

import { mapGroupsToQuestions } from 'global/reducers/questionGroups/utils';
import { GET_QUESTION_GROUPS_REQUEST } from '../constants';
import { getQuestionGroupsError, getQuestionGroupsSuccess } from '../actions';

function* getQuestionsGroups({ payload: { interventionId } }) {
  const groupURL = `/v1/interventions/${interventionId}/question_groups`;

  try {
    const {
      data: { question_groups: groups },
    } = yield axios.get(groupURL);
    const questions = mapGroupsToQuestions(groups);
    const groupsWithoutQuestions = groups.map(group =>
      omit(group, 'questions'),
    );
    const sortedQuestions = sortBy(questions, 'position');
    const sortedGroups = sortBy(groupsWithoutQuestions, 'position');
    yield put(getQuestionsSuccess(sortedQuestions));
    if (!isEmpty(sortedQuestions) && sortedQuestions[0].narrator.blocks[0]) {
      const position = sortedQuestions[0].narrator.blocks[0].endPosition;
      yield put(setAnimationStopPosition(position.x, position.y));
    }
    yield put(getQuestionGroupsSuccess(sortedGroups));
  } catch (error) {
    yield put(getQuestionGroupsError(error));
  }
}

export default function* getQuestionsGroupsSaga() {
  yield takeLatest(GET_QUESTION_GROUPS_REQUEST, getQuestionsGroups);
}
