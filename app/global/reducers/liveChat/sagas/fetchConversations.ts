import axios, { AxiosResponse } from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { ApiData, ApiError } from 'models/Api';
import { DenormalizedConversation } from 'models/LiveChat';

import { FETCH_CONVERSATIONS_REQUEST } from '../constants';
import { fetchConversationsSuccess, fetchConversationsError } from '../actions';
import { mapFetchConversationsResponse } from '../utils';

function* fetchConversations() {
  const url = `/v1/live_chat/conversations`;
  try {
    const { data }: AxiosResponse<ApiData<DenormalizedConversation>> =
      yield call(axios.get, url);
    const conversations = mapFetchConversationsResponse(data);
    yield put(fetchConversationsSuccess(conversations));
  } catch (error) {
    yield put(fetchConversationsError(error as ApiError));
  }
}

export function* fetchConversationsSaga() {
  yield takeLatest(FETCH_CONVERSATIONS_REQUEST, fetchConversations);
}
