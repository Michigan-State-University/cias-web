import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';
import omit from 'lodash/omit';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';

import messages from '../messages';
import {
  DUPLICATE_GROUPS_HERE_REQUEST,
  DUPLICATE_GROUPS_HERE_ERROR,
} from '../constants';
import {
  duplicateGroupsHereSuccess,
  duplicateGroupsHereError,
} from '../actions';
import {
  mapGroupsToQuestions,
  mapQuestionIdsToDuplicateGroupStructure,
} from '../utils';

function* duplicateGroupsHere({ payload: { questionIds, sessionId } }) {
  const requestURL = `/v1/sessions/${sessionId}/question_group/duplicate_here`;
  try {
    const questionGroups = yield call(
      mapQuestionIdsToDuplicateGroupStructure,
      questionIds,
    );
    const {
      data: { data },
    } = yield call(axios.post, requestURL, { question_groups: questionGroups });

    const groups = jsonApiToArray(data, 'questionGroup');
    const questions = mapGroupsToQuestions(groups);

    const groupsWithoutQuestions = groups.map((group) =>
      omit(group, 'questions'),
    );
    const mappedQuestions = questions.map((q) =>
      objectKeysToSnakeCase(q, ['sha256', 'endPosition', 'pauseDuration']),
    );

    yield call(toast.success, formatMessage(messages.duplicateGroupsSuccess), {
      id: DUPLICATE_GROUPS_HERE_ERROR,
    });
    yield put(
      duplicateGroupsHereSuccess(mappedQuestions, groupsWithoutQuestions),
    );
  } catch (error) {
    yield call(toast.error, formatMessage(messages.duplicateGroupsError), {
      toastId: DUPLICATE_GROUPS_HERE_ERROR,
    });
    yield put(duplicateGroupsHereError(error));
  }
}

export default function* duplicateGroupsHereSaga() {
  yield takeLatest(DUPLICATE_GROUPS_HERE_REQUEST, duplicateGroupsHere);
}
