import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { GET_QUESTION_GROUPS_REQUEST } from '../constants';
import { getQuestionsGroupsError, getQuestionGroupsSuccess } from '../actions';

function* getQuestionsGroups({ payload: { interventionId } }) {
  const groupURL = `/v1/interventions/${interventionId}/questions_groups`;

  try {
    const {
      data: { questions_groups: groups },
    } = yield axios.get(groupURL);
    console.log(groups);
    const fg = groups.filter(({ questions }) => questions.length !== 0);
    yield put(getQuestionGroupsSuccess(fg));
  } catch (error) {
    yield put(getQuestionsGroupsError(error));
  }
}

export default function* getQuestionsGroupsSaga() {
  yield takeLatest(GET_QUESTION_GROUPS_REQUEST, getQuestionsGroups);
}
