import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';

import { getQuestionsSuccess } from 'global/reducers/questions/actions';
import { setAnimationStopPosition } from 'global/reducers/localState';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';

import { mapGroupsToQuestions } from 'global/reducers/questionGroups/utils';
import { GET_QUESTION_GROUPS_REQUEST } from '../constants';
import { getQuestionGroupsError, getQuestionGroupsSuccess } from '../actions';

function* getQuestionsGroups({ payload: { sessionId } }) {
  const groupURL = `/v1/sessions/${sessionId}/question_groups`;

  try {
    const { data } = yield axios.get(groupURL);
    const groups = jsonApiToArray(data, 'questionGroup');
    const questions = mapGroupsToQuestions(groups);
    const groupsWithoutQuestions = groups.map(group =>
      omit(group, 'questions'),
    );
    const sortedQuestions = sortBy(questions, 'position');
    const sortedGroups = sortBy(groupsWithoutQuestions, 'position');
    const mappedQuestions = sortedQuestions.map(q =>
      objectKeysToSnakeCase(q, ['sha256', 'endPosition']),
    );
    yield put(getQuestionsSuccess(mappedQuestions));
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
