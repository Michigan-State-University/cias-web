import axios from 'axios';
import { toast } from 'react-toastify';
import { call, takeLatest } from 'redux-saga/effects';

import messages from 'containers/LiveChatNavigatorPanel/messages';

import { formatMessage } from 'utils/intlOutsideReact';

import { generateConversationTranscriptRequest } from '../actions';
import { GENERATE_CONVERSATION_TRANSCRIPT_REQUEST } from '../constants';

function* generateConversationTranscript({
  payload: { conversationId },
}: ReturnType<typeof generateConversationTranscriptRequest>) {
  const url = `/v1/live_chat/conversations/${conversationId}/generate_transcript`;

  try {
    yield call(axios.post, url);
    yield call(
      toast.info,
      formatMessage(messages.generateConversationTranscriptSuccess),
    );
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.generateConversationTranscriptError),
    );
  }
}

export function* generateConversationTranscriptSaga() {
  yield takeLatest(
    GENERATE_CONVERSATION_TRANSCRIPT_REQUEST,
    generateConversationTranscript,
  );
}
