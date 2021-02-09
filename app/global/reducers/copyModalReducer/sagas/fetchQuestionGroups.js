import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import sortBy from 'lodash/sortBy';

import { FinishGroupType } from 'models/Session/GroupTypes';

import { FETCH_QUESTION_GROUPS_REQUEST } from '../constants';
import {
  fetchQuestionGroupsSuccess,
  fetchQuestionGroupsError,
} from '../actions';

export function* fetchQuestionsGroups({ payload: { id } }) {
  const groupURL = `/v1/sessions/${id}/question_groups`;
  try {
    const {
      data: { question_groups: groups },
    } = yield axios.get(groupURL);
    const sortedGroups = sortBy(groups, 'position').filter(
      ({ type }) => type !== FinishGroupType,
    );

    const mappedGroups = sortedGroups.map(group => ({
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
