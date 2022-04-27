import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  SHARE_GROUPS_EXTERNALLY_REQUEST,
  SHARE_GROUPS_EXTERNALLY_ERROR,
  SHARE_GROUPS_EXTERNALLY_SUCCESS,
} from '../constants';
import {
  shareGroupsExternallySuccess,
  shareGroupsExternallyError,
} from '../actions';
import { mapQuestionIdsToDuplicateGroupStructure } from '../utils';

function* shareQuestionsToResearchers({
  payload: { questionIds, researcherIds, sessionId },
}) {
  const requestURL = `v1/question_groups/share_externally`;

  try {
    const questionGroups = yield call(
      mapQuestionIdsToDuplicateGroupStructure,
      questionIds,
    );

    yield call(axios.post, requestURL, {
      question_groups: questionGroups,
      user_ids: researcherIds,
      session_id: sessionId,
    });
    yield put(shareGroupsExternallySuccess());
    yield call(toast.info, formatMessage(messages.shareSuccess), {
      id: SHARE_GROUPS_EXTERNALLY_SUCCESS,
    });
  } catch (error) {
    yield call(toast.error, formatMessage(messages.shareError), {
      id: SHARE_GROUPS_EXTERNALLY_ERROR,
    });
    yield put(shareGroupsExternallyError(error));
  }
}

export default function* shareQuestionsToResearchersSaga() {
  yield takeLatest(
    SHARE_GROUPS_EXTERNALLY_REQUEST,
    shareQuestionsToResearchers,
  );
}
