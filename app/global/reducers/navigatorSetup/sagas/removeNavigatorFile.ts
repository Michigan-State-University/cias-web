import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { ApiError } from 'models/Api';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  REMOVE_NAVIGATOR_FILE_ERROR,
  REMOVE_NAVIGATOR_FILE_REQUEST,
} from '../constants';
import {
  removeNavigatorFileSuccess,
  removeNavigatorFileError,
  removeNavigatorFileRequest,
} from '../actions';
import messages from '../messages';

export function* removeNavigatorFile({
  payload: { interventionId, fileId },
}: ReturnType<typeof removeNavigatorFileRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setups/files/${fileId}`;
  try {
    yield call(axios.delete, url);
    yield put(removeNavigatorFileSuccess(fileId));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: REMOVE_NAVIGATOR_FILE_ERROR,
    });
    yield put(removeNavigatorFileError(fileId, error as ApiError));
  }
}

export default function* removeNavigatorFileSaga() {
  yield takeLatest(REMOVE_NAVIGATOR_FILE_REQUEST, removeNavigatorFile);
}
