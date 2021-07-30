import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { TextMessagesBuilder } from 'models/TextMessage';

import { FETCH_TEXT_MESSAGES_REQUEST } from '../constants';
import {
  fetchTextMessagesSuccess,
  fetchTextMessagesError,
  changeSelectedMessageId,
  fetchVariantsRequest,
} from '../actions';

export function* fetchTextMessages({ payload: { sessionId } }) {
  try {
    const requestUrl = `/v1/sessions/${sessionId}/sms_plans`;
    const {
      data: { data },
    } = yield call(axios.get, requestUrl);

    const mappedData = data.map((item) =>
      new TextMessagesBuilder().fromJson(item).build(),
    );

    yield put(fetchTextMessagesSuccess(mappedData));
    if (mappedData?.length) {
      const selectedTextMessageId = mappedData[0].id;
      yield put(changeSelectedMessageId(selectedTextMessageId));
      yield put(fetchVariantsRequest());
    }
  } catch (error) {
    yield put(fetchTextMessagesError(error));
  }
}

export default function* fetchTextMessagesSaga() {
  yield takeLatest(FETCH_TEXT_MESSAGES_REQUEST, fetchTextMessages);
}
