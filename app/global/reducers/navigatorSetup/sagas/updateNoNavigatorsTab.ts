import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { ApiError } from 'models/Api';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  UPDATE_NO_NAVIGATOR_TAB_REQUEST,
  UPDATE_NO_NAVIGATOR_TAB_ERROR,
} from '../constants';
import {
  updateNoNavigatorsTabError,
  updateNoNavigatorTabRequest,
  updateNoNavigatorsTabSuccess,
} from '../actions';
import messages from '../messages';

export function* updateNoNavigatorsTab({
  payload: { interventionId, noNavigatorsData },
}: ReturnType<typeof updateNoNavigatorTabRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setup`;
  try {
    const { phone, messagePhone, ...rest } = noNavigatorsData;
    yield call(
      axios.patch,
      url,
      objectToSnakeCase({
        // @ts-ignore
        navigatorSetup: {
          phoneAttributes: phone,
          messagePhoneAttributes: messagePhone,
          ...rest,
        },
      }),
    );
    yield put(updateNoNavigatorsTabSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: UPDATE_NO_NAVIGATOR_TAB_ERROR,
    });
    yield put(updateNoNavigatorsTabError(error as ApiError));
  }
}

export default function* updateNoNavigatorsTabSaga() {
  yield takeLatest(UPDATE_NO_NAVIGATOR_TAB_REQUEST, updateNoNavigatorsTab);
}
