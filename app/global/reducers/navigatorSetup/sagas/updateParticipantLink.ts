import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { ApiError } from 'models/Api';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  ADD_PARTICIPANT_LINK_ERROR,
  UPDATE_PARTICIPANT_LINK_REQUEST,
} from '../constants';
import {
  addParticipantLinkError,
  updateParticipantLinkSuccess,
  updateParticipantLinkRequest,
} from '../actions';
import messages from '../messages';

export function* updateParticipantLink({
  payload: { interventionId, linkId, linkData },
}: ReturnType<typeof updateParticipantLinkRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setups/links/${linkId}`;
  try {
    yield call(axios.patch, url, objectToSnakeCase({ link: linkData }));

    yield put(updateParticipantLinkSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: ADD_PARTICIPANT_LINK_ERROR,
    });
    yield put(addParticipantLinkError(error as ApiError));
  }
}

export default function* updateParticipantLinkSaga() {
  yield takeLatest(UPDATE_PARTICIPANT_LINK_REQUEST, updateParticipantLink);
}
