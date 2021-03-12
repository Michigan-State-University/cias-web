import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  SHARE_QUESTIONS_TO_RESEARCHERS_REQUEST,
  SHARE_QUESTIONS_TO_RESEARCHERS_ERROR,
  SHARE_QUESTIONS_TO_RESEARCHERS_SUCCESS,
} from '../constants';
import {
  shareQuestionsToResearchersSuccess,
  shareQuestionsToResearchersError,
} from '../actions';

function* shareQuestionsToResearchers({
  payload: { questionIds, researcherIds },
}) {
  const requestURL = `/v1/questions/share`;

  try {
    yield call(axios.post, requestURL, {
      ids: questionIds,
      researcher_ids: researcherIds,
    });
    yield put(shareQuestionsToResearchersSuccess());
    yield call(toast.info, formatMessage(messages.shareSuccess), {
      id: SHARE_QUESTIONS_TO_RESEARCHERS_SUCCESS,
    });
  } catch (error) {
    yield call(toast.error, formatMessage(messages.shareError), {
      id: SHARE_QUESTIONS_TO_RESEARCHERS_ERROR,
    });
    yield put(shareQuestionsToResearchersError(error));
  }
}

export default function* shareQuestionsToResearchersSaga() {
  yield takeLatest(
    SHARE_QUESTIONS_TO_RESEARCHERS_REQUEST,
    shareQuestionsToResearchers,
  );
}
