import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import sortBy from 'lodash/sortBy';

import { GroupType } from 'models/QuestionGroup';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { FETCH_QUESTION_GROUPS_REQUEST } from '../constants';
import {
  fetchQuestionGroupsSuccess,
  fetchQuestionGroupsError,
} from '../actions';

export function* fetchQuestionsGroups({ payload: { id } }) {
  const groupURL = `/v1/sessions/${id}/question_groups`;
  try {
    const { data } = yield axios.get(groupURL);
    const groups = jsonApiToArray(data, 'questionGroup');

    const sortedGroups = sortBy(groups, 'position').filter(
      ({ type }) => type !== GroupType.FINISH,
    );

    const mappedGroups = sortedGroups.map((group) => ({
      name: group.title,
      ...group,
    }));

    yield put(fetchQuestionGroupsSuccess(mappedGroups));
  } catch (error) {
    yield put(fetchQuestionGroupsError(error));
  }
}

export default function* fetchQuestionsGroupsSaga() {
  yield takeLatest(FETCH_QUESTION_GROUPS_REQUEST, fetchQuestionsGroups);
}
