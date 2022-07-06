import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatMessage } from 'utils/intlOutsideReact';

import { ApiError } from 'models/Api';
import { NavigatorSetup } from 'models/NavigatorSetup';

import {
  ADD_PARTICIPANT_LINK_REQUEST,
  ADD_PARTICIPANT_LINK_ERROR,
} from '../constants';
import {
  addParticipantLinkError,
  addParticipantLinkRequest,
  addParticipantLinkSuccess,
} from '../actions';
import messages from '../messages';

export function* addParticipantLink({
  payload: { interventionId, participantLink },
}: ReturnType<typeof addParticipantLinkRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigator_setups/participant_links`;
  try {
    const { data } = yield call(
      axios.post,
      url,
      objectToSnakeCase({ participantLink }),
    );

    const navigatorSetup = jsonApiToObject(
      data,
      'navigatorSetup',
    ) as NavigatorSetup;

    yield put(addParticipantLinkSuccess(navigatorSetup));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: ADD_PARTICIPANT_LINK_ERROR,
    });
    yield put(addParticipantLinkError(error as ApiError));
  }
}

export default function* addParticipantLinkSaga() {
  yield takeLatest(ADD_PARTICIPANT_LINK_REQUEST, addParticipantLink);
}
