import { takeLatest, put } from 'redux-saga/effects';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import axios from 'axios';
import { push } from 'connected-react-router';
import { success as showSuccess } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';
import { requestErrorMessageHandler } from 'utils/errors/requestErrorMessageHandler';

import {
  REGISTER_PARTICIPANT_REQUEST,
  REGISTER_PARTICIPANT_SUCCESS,
} from '../constants';
import {
  registerParticipantError,
  registerParticipantSuccess,
} from '../actions';
import messages from '../messages';

function* registerParticipant({ payload }) {
  const requestURL = `v1/auth`;

  try {
    yield axios.post(requestURL, {
      ...objectToSnakeCase(payload),
      confirm_success_url: `${process.env.WEB_URL}/login`,
    });
    yield put(registerParticipantSuccess());
    yield put(push('/login'));
    yield put(
      showSuccess(formatMessage(messages.createdAccount), {
        id: REGISTER_PARTICIPANT_SUCCESS,
      }),
    );
  } catch (error) {
    yield put(registerParticipantError(requestErrorMessageHandler(error)));
  }
}

export default function* registerParticipantSaga() {
  yield takeLatest(REGISTER_PARTICIPANT_REQUEST, registerParticipant);
}