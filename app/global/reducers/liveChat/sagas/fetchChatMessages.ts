import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { LiveChatMessage } from 'models/LiveChatMessage';

import { FETCH_CHAT_MESSAGES_REQUEST } from '../constants';
import {
  fetchChatMessagesRequest,
  fetchChatMessagesSuccess,
  fetchChatMessageError,
} from '../actions';

export function* fetchChatMessages({
  payload: { conversationId },
}: ReturnType<typeof fetchChatMessagesRequest>) {
  const url = `/v1/live_chat/conversations/${conversationId}/messages`;
  try {
    const { data } = yield call(axios.get, url);
    const messages: LiveChatMessage[] = jsonApiToArray(data, 'message');
    yield put(fetchChatMessagesSuccess(conversationId, messages));
  } catch (error) {
    yield put(fetchChatMessageError(conversationId));
  }
}
export default function* fetchChatMessagesSaga() {
  yield takeLatest(FETCH_CHAT_MESSAGES_REQUEST, fetchChatMessages);
}
