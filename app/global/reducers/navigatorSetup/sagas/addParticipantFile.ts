import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';

import { ApiError } from 'models/Api';
import { FileFor, NavigatorSetup } from 'models/NavigatorSetup';

import {
  ADD_PARTICIPANT_FILE_REQUEST,
  ADD_PARTICIPANT_FILE_ERROR,
} from '../constants';
import {
  addParticipantFileError,
  addParticipantFileRequest,
  addParticipantFileSuccess,
} from '../actions';
import messages from '../messages';

export function* addParticipantFile({
  payload: { interventionId, files },
}: ReturnType<typeof addParticipantFileRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setups/files`;

  const formData = new FormData();
  formData.set(`navigator_setup[files_for]`, FileFor.PARTICIPANTS);
  files.forEach((file: File) =>
    formData.append(`navigator_setup[files][]`, file),
  );

  const headers = { 'Content-Type': 'multipart/form-data' };

  try {
    const { data } = yield call(axios.post, url, formData, { headers });

    const navigatorSetup = jsonApiToObject(
      data,
      'navigatorSetup',
    ) as NavigatorSetup;

    yield put(addParticipantFileSuccess(navigatorSetup));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: ADD_PARTICIPANT_FILE_ERROR,
    });
    yield put(addParticipantFileError(error as ApiError));
  }
}

export default function* addParticipantFileSaga() {
  yield takeLatest(ADD_PARTICIPANT_FILE_REQUEST, addParticipantFile);
}
