import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import {
  error as showError,
  success as showSuccess,
} from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';
import { requestErrorMessageHandler } from 'utils/errors/requestErrorMessageHandler';

import messages from '../messages';
import {
  CANCEL_INVITATION_REQUEST,
  CANCEL_INVITATION_ERROR,
  CANCEL_INVITATION_SUCCESS,
} from '../constants';
import { cancelInvitationSuccess, cancelInvitationError } from '../actions';

export function* cancelInvitation({ payload: { id } }) {
  const requestUrl = `/v1/users/invitations/${id}`;
  try {
    yield call(axios.delete, requestUrl);
    yield put(cancelInvitationSuccess(id));
    yield put(
      showSuccess(formatMessage(messages.successCanceling), {
        id: CANCEL_INVITATION_SUCCESS,
      }),
    );
  } catch (error) {
    yield put(
      showError(formatMessage(messages.errorCanceling), {
        id: CANCEL_INVITATION_ERROR,
      }),
    );
    yield put(cancelInvitationError(requestErrorMessageHandler(error)));
  }
}

export default function* cancelInvitationSaga() {
  yield takeLatest(CANCEL_INVITATION_REQUEST, cancelInvitation);
}
