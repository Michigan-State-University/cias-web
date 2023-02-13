import axios from 'axios';
import { call, put, takeLatest, select } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  generateConversationsTranscriptError,
  generateConversationsTranscriptSuccess,
} from '../actions';
import { makeSelectInterventionId } from '../selectors';
import messages from '../messages';
import { GENERATE_CONVERSATIONS_TRANSCRIPT_REQUEST } from '../constants';

export function* generateConversationsTranscript() {
  const interventionId: Nullable<string> = yield select(
    makeSelectInterventionId(),
  );
  if (!interventionId) return;

  const requestURL = `v1/interventions/${interventionId}/generate_conversations_transcript`;

  try {
    yield call(axios.post, requestURL);
    yield call(
      toast.info,
      formatMessage(messages.generateConversationTranscriptSuccess),
    );
    yield put(generateConversationsTranscriptSuccess());
  } catch (error) {
    yield put(generateConversationsTranscriptError(error));
    yield call(
      toast.error,
      formatMessage(messages.generateConversationTranscriptError),
    );
  }
}

export default function* generateConversationsTranscriptSaga() {
  yield takeLatest(
    GENERATE_CONVERSATIONS_TRANSCRIPT_REQUEST,
    generateConversationsTranscript,
  );
}
