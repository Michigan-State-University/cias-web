import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { CHANGE_SCHEDULING_FREQUENCY } from 'global/reducers/textMessages/settings/constants';
import { UPDATE_TEXT_MESSAGE_SETTINGS_REQUEST } from '../constants';
import {
  updateTextMessageSettingsSuccess,
  updateTextMessageSettingsError,
} from '../actions';
import { makeSelectSelectedMessageId } from '../selectors';

export function* updateTextMessage({ payload: { value: actionValue } }) {
  try {
    const {
      type,
      data: { value, field },
    } = actionValue;
    let body;
    if (type === CHANGE_SCHEDULING_FREQUENCY)
      body = { sms_plan: { end_at: value.endAt, frequency: value.frequency } };
    else body = objectToSnakeCase({ sms_plan: { [field]: value } });
    const currentTextMessageId = yield select(makeSelectSelectedMessageId());
    const requestUrl = `/v1/sms_plans/${currentTextMessageId}`;

    yield call(axios.patch, requestUrl, body);
    yield put(updateTextMessageSettingsSuccess());
  } catch (error) {
    yield put(updateTextMessageSettingsError(error));
  }
}

export default function* updateTextMessageSaga() {
  yield takeLatest(UPDATE_TEXT_MESSAGE_SETTINGS_REQUEST, updateTextMessage);
}
