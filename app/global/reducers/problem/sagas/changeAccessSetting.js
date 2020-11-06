import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  CHANGE_ACCESS_SETTING_REQUEST,
  CHANGE_ACCESS_SETTING_ERROR,
} from '../constants';
import {
  changeAccessSettingSuccess,
  changeAccessSettingFailure,
} from '../actions';
import messages from '../messages';

export function* changeAccessSetting({ payload: { id, setting } }) {
  const requestURL = `v1/problems/${id}`;
  try {
    yield call(axios.patch, requestURL, { shared_to: setting });
    yield put(changeAccessSettingSuccess());
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.changeAccessSettingFailure),
      {
        toastId: CHANGE_ACCESS_SETTING_ERROR,
      },
    );
    yield put(changeAccessSettingFailure(error));
  }
}

export default function* changeAccessSettingSaga() {
  yield takeLatest(CHANGE_ACCESS_SETTING_REQUEST, changeAccessSetting);
}
