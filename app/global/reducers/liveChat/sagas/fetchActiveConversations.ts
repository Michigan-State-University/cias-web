import axios, { AxiosResponse } from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { ApiDataCollection, ApiError } from 'models/Api';
import { DenormalizedConversation } from 'models/LiveChat';

import { FETCH_ACTIVE_CONVERSATIONS_REQUEST } from '../constants';
import {
  fetchActiveConversationsSuccess,
  fetchActiveConversationsError,
} from '../actions';
import { mapFetchConversationsResponse } from '../utils';

function* fetchActiveConversations() {
  const url = `/v1/live_chat/conversations`;
  const params = {
    archived: false,
  };
  try {
    const { data }: AxiosResponse<ApiDataCollection<DenormalizedConversation>> =
      yield call(axios.get, url, { params });
    const { conversations, interventionConversations } =
      mapFetchConversationsResponse(data);
    yield put(
      fetchActiveConversationsSuccess(interventionConversations, conversations),
    );
  } catch (error) {
    yield put(fetchActiveConversationsError(error as ApiError));
  }
}

export function* fetchActiveConversationsSaga() {
  yield takeLatest(
    FETCH_ACTIVE_CONVERSATIONS_REQUEST,
    fetchActiveConversations,
  );
}
