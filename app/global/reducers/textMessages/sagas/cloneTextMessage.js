import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { TextMessagesBuilder } from 'models/TextMessage';
import {
  CLONE_TEXT_MESSAGE_REQUEST,
  CLONE_TEXT_MESSAGE_ERROR,
} from '../constants';
import {
  cloneTextMessageSuccess,
  cloneTextMessageError,
  changeSelectedMessageId,
} from '../actions';
import messages from '../messages';

export function* cloneTextMessage({ payload: { textMessageId } }) {
  try {
    const requestUrl = `v1/sms_plans/${textMessageId}/clone`;
    const {
      data: { data },
    } = yield call(axios.post, requestUrl);
    const mappedData = new TextMessagesBuilder().fromJson(data).build();

    yield put(cloneTextMessageSuccess(mappedData));
    yield put(changeSelectedMessageId(mappedData.id));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.copyError), {
      id: CLONE_TEXT_MESSAGE_ERROR,
    });
    yield put(cloneTextMessageError(error));
  }
}

export default function* cloneTextMessageSaga() {
  yield takeLatest(CLONE_TEXT_MESSAGE_REQUEST, cloneTextMessage);
}
