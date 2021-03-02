import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { UPDATE_TEXT_MESSAGE_SETTINGS_REQUEST } from '../constants';
import {
  updateTextMessageSettingsSuccess,
  updateTextMessageSettingsError,
} from '../actions';
import { makeSelectSelectedMessageId } from '../selectors';

export function* updateTextMessage({ payload: { value: actionValue } }) {
  try {
    const {
      data: { value, field },
    } = actionValue;
    const currentTextMessageId = yield select(makeSelectSelectedMessageId());
    const requestUrl = `/v1/sms_plans/${currentTextMessageId}`;
    const body = objectToSnakeCase({ sms_plan: { [field]: value } });

    yield call(axios.patch, requestUrl, body);
    yield put(updateTextMessageSettingsSuccess());
  } catch (error) {
    yield put(updateTextMessageSettingsError(error));
  }
}

export default function* updateTextMessageSaga() {
  yield takeLatest(UPDATE_TEXT_MESSAGE_SETTINGS_REQUEST, updateTextMessage);
}
