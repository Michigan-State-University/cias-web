import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { TextMessagesBuilder } from 'models/TextMessage';
import { CREATE_TEXT_MESSAGE_REQUEST } from '../constants';
import {
  createTextMessageSuccess,
  createTextMessageError,
  changeSelectedMessageId,
} from '../actions';

export function* createTextMessage({ payload: { textMessage } }) {
  try {
    const { sessionId, id, ...restProps } = textMessage;
    const requestUrl = 'v1/sms_plans';
    const {
      data: { data },
    } = yield call(axios.post, requestUrl, {
      sms_plan: { session_id: sessionId, ...restProps },
    });
    const mappedData = new TextMessagesBuilder().fromJson(data).build();

    yield put(createTextMessageSuccess(mappedData, id));
    yield put(changeSelectedMessageId(mappedData.id));
  } catch (error) {
    yield put(createTextMessageError(error));
  }
}

export default function* createTextMessageSaga() {
  yield takeLatest(CREATE_TEXT_MESSAGE_REQUEST, createTextMessage);
}
