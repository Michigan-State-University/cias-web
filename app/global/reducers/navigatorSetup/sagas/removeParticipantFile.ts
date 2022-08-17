import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { ApiError } from 'models/Api';
import { FileFor } from 'models/NavigatorSetup';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  REMOVE_PARTICIPANT_FILE_ERROR,
  REMOVE_PARTICIPANT_FILE_REQUEST,
} from '../constants';
import {
  removeParticipantFileSuccess,
  removeParticipantFileError,
  removeParticipantFileRequest,
} from '../actions';
import messages from '../messages';

export function* removeParticipantFile({
  payload: { interventionId, fileId },
}: ReturnType<typeof removeParticipantFileRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setups/files/${fileId}?files_for=${FileFor.PARTICIPANTS}`;
  try {
    yield call(axios.delete, url);
    yield put(removeParticipantFileSuccess(fileId));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: REMOVE_PARTICIPANT_FILE_ERROR,
    });
    yield put(removeParticipantFileError(fileId, error as ApiError));
  }
}

export default function* removeParticipantFileSaga() {
  yield takeLatest(REMOVE_PARTICIPANT_FILE_REQUEST, removeParticipantFile);
}
