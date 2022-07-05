import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { ApiError } from 'models/Api';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  UPDATE_NAVIGATOR_SETUP_REQUEST,
  UPDATE_NAVIGATOR_SETUP_ERROR,
} from '../constants';
import {
  updateNavigatorSetupError,
  updateNavigatorSetupRequest,
  updateNavigatorSetupSuccess,
} from '../actions';
import messages from '../messages';

export function* updateNavigatorSetup({
  payload: { interventionId, navigatorSetupData: navigatorSetup },
}: ReturnType<typeof updateNavigatorSetupRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setup`;
  try {
    yield call(axios.patch, url, objectToSnakeCase({ navigatorSetup }));
    yield put(updateNavigatorSetupSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: UPDATE_NAVIGATOR_SETUP_ERROR,
    });
    yield put(updateNavigatorSetupError(error as ApiError));
  }
}

export default function* updateNavigatorSetupSaga() {
  yield takeLatest(UPDATE_NAVIGATOR_SETUP_REQUEST, updateNavigatorSetup);
}
