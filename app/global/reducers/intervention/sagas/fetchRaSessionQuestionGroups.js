import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { put, call, takeLatest } from 'redux-saga/effects';

import { GroupType } from 'models/QuestionGroup';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import {
  fetchRaSessionQuestionGroupsSuccess,
  fetchRaSessionQuestionGroupsError,
} from '../actions';
import { FETCH_RA_SESSION_QUESTION_GROUPS_REQUEST } from '../constants';

export function* fetchRaSessionQuestionGroups({ payload: { sessionId } }) {
  try {
    const { data } = yield call(
      axios.get,
      `/v1/sessions/${sessionId}/question_groups`,
    );
    const groups = jsonApiToArray(data, 'questionGroup');
    const sorted = sortBy(groups, 'position').filter(
      ({ type }) => type !== GroupType.FINISH,
    );
    yield put(fetchRaSessionQuestionGroupsSuccess(sorted));
  } catch (error) {
    yield put(fetchRaSessionQuestionGroupsError(error));
  }
}

export default function* fetchRaSessionQuestionGroupsSaga() {
  yield takeLatest(
    FETCH_RA_SESSION_QUESTION_GROUPS_REQUEST,
    fetchRaSessionQuestionGroups,
  );
}
