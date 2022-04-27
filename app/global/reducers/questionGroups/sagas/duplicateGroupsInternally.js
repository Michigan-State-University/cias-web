import { takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  DUPLICATE_GROUPS_INTERNALLY_REQUEST,
  DUPLICATE_GROUPS_INTERNALLY_ERROR,
  DUPLICATE_GROUPS_INTERNALLY_SUCCESS,
} from '../constants';
import { mapQuestionIdsToDuplicateGroupStructure } from '../utils';

function* duplicateGroupsInternally({ payload: { questionIds, sessionId } }) {
  const requestURL = `/v1/question_groups/duplicate_internally`;
  try {
    const questionGroups = yield call(
      mapQuestionIdsToDuplicateGroupStructure,
      questionIds,
    );
    yield call(axios.post, requestURL, {
      question_groups: questionGroups,
      session_id: sessionId,
    });
    yield call(toast.success, formatMessage(messages.duplicateGroupsSuccess), {
      id: DUPLICATE_GROUPS_INTERNALLY_SUCCESS,
    });
  } catch (error) {
    yield call(toast.error, formatMessage(messages.duplicateGroupsError), {
      id: DUPLICATE_GROUPS_INTERNALLY_ERROR,
    });
  }
}

export default function* duplicateGroupsInternallySaga() {
  yield takeLatest(
    DUPLICATE_GROUPS_INTERNALLY_REQUEST,
    duplicateGroupsInternally,
  );
}
