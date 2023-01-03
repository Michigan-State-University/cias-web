import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { Message } from 'models/LiveChat';
import { ApiDataCollection, ApiError } from 'models/Api';

import { FETCH_CONVERSATION_MESSAGES_REQUEST } from '../constants';
import {
  fetchConversationMessagesRequest,
  fetchConversationMessagesSuccess,
  fetchConversationMessagesError,
} from '../actions';

function* fetchChatMessages({
  payload: { conversationId },
}: ReturnType<typeof fetchConversationMessagesRequest>) {
  const url = `/v1/live_chat/conversations/${conversationId}/messages`;
  try {
    const { data }: ApiDataCollection<Message> = yield call(axios.get, url);
    const messages: Message[] = jsonApiToArray(data, 'message');
    yield put(fetchConversationMessagesSuccess(conversationId, messages));
  } catch (error) {
    yield put(
      fetchConversationMessagesError(conversationId, error as ApiError),
    );
  }
}

export function* fetchChatMessagesSaga() {
  yield takeLatest(FETCH_CONVERSATION_MESSAGES_REQUEST, fetchChatMessages);
}
