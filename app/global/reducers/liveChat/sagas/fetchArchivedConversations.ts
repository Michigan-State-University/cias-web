import axios, { AxiosResponse } from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { ApiDataCollection, ApiError } from 'models/Api';
import { DenormalizedConversation } from 'models/LiveChat';

import { FETCH_ARCHIVED_CONVERSATIONS_REQUEST } from '../constants';
import {
  fetchArchivedConversationsSuccess,
  fetchArchivedConversationsError,
} from '../actions';
import { mapFetchConversationsResponse } from '../utils';

function* fetchArchivedConversations() {
  const url = `/v1/live_chat/conversations`;
  const params = {
    archived: true,
  };
  try {
    const { data }: AxiosResponse<ApiDataCollection<DenormalizedConversation>> =
      yield call(axios.get, url, { params });
    const { conversations, interventionConversations } =
      mapFetchConversationsResponse(data);
    yield put(
      fetchArchivedConversationsSuccess(
        interventionConversations,
        conversations,
      ),
    );
  } catch (error) {
    yield put(fetchArchivedConversationsError(error as ApiError));
  }
}

export function* fetchArchivedConversationsSaga() {
  yield takeLatest(
    FETCH_ARCHIVED_CONVERSATIONS_REQUEST,
    fetchArchivedConversations,
  );
}
