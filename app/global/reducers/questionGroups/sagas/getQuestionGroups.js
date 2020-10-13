import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';

import { getQuestionsSuccess } from 'global/reducers/questions/actions';
import { setAnimationStopPosition } from 'global/reducers/localState';

import { GET_QUESTION_GROUPS_REQUEST } from '../constants';
import { getQuestionGroupsError, getQuestionGroupsSuccess } from '../actions';

function* getQuestionsGroups({ payload: { interventionId } }) {
  const groupURL = `/v1/interventions/${interventionId}/question_groups`;

  try {
    const {
      data: { question_groups: groups },
    } = yield axios.get(groupURL);
    const questions = flatten(
      groups.map(({ questions: groupQuestions, id }) =>
        groupQuestions.map(question => ({
          ...question,
          question_group_id: id,
        })),
      ),
    );
    const sortedQuestions = sortBy(questions, 'position');
    yield put(getQuestionsSuccess(sortedQuestions));
    if (!isEmpty(sortedQuestions) && sortedQuestions[0].narrator.blocks[0]) {
      const position = sortedQuestions[0].narrator.blocks[0].endPosition;
      yield put(setAnimationStopPosition(position.x, position.y));
    }
    yield put(getQuestionGroupsSuccess(groups));
  } catch (error) {
    yield put(getQuestionGroupsError(error));
  }
}

export default function* getQuestionsGroupsSaga() {
  yield takeLatest(GET_QUESTION_GROUPS_REQUEST, getQuestionsGroups);
}
