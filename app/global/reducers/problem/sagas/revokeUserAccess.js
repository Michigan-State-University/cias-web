import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  REVOKE_USER_ACCESS_REQUEST,
  REVOKE_USER_ACCESS_ERROR,
} from '../constants';
import { revokeUserAccessSuccess, revokeUserAccessFailure } from '../actions';
import messages from '../messages';

function* revokeUserAccess({ payload: { problemId, userId } }) {
  const requestURL = `v1/problems/${problemId}/users/${userId}`;
  try {
    yield axios.delete(requestURL);
    yield put(revokeUserAccessSuccess(userId));
  } catch (error) {
    yield put(
      showError(formatMessage(messages.revokeAccessError), {
        id: REVOKE_USER_ACCESS_ERROR,
      }),
    );
    yield put(revokeUserAccessFailure(userId, error));
  }
}

export default function* revokeUserAccessSaga() {
  yield takeLatest(REVOKE_USER_ACCESS_REQUEST, revokeUserAccess);
}
