import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { ApiError } from 'models/Api';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  REMOVE_PARTICIPANT_LINK_ERROR,
  REMOVE_PARTICIPANT_LINK_REQUEST,
} from '../constants';
import {
  removeParticipantLinkSuccess,
  removeParticipantLinkError,
  removeParticipantLinkRequest,
} from '../actions';
import messages from '../messages';

export function* removeParticipantLink({
  payload: { interventionId, linkId },
}: ReturnType<typeof removeParticipantLinkRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setups/links/${linkId}`;
  try {
    yield call(axios.delete, url);
    yield put(removeParticipantLinkSuccess(linkId));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: REMOVE_PARTICIPANT_LINK_ERROR,
    });
    yield put(removeParticipantLinkError(linkId, error as ApiError));
  }
}

export default function* removeParticipantLinkSaga() {
  yield takeLatest(REMOVE_PARTICIPANT_LINK_REQUEST, removeParticipantLink);
}
