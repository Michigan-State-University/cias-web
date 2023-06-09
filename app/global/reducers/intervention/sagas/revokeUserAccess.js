import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  REVOKE_USER_ACCESS_REQUEST,
  REVOKE_USER_ACCESS_ERROR,
} from '../constants';
import { revokeUserAccessSuccess, revokeUserAccessFailure } from '../actions';
import messages from '../messages';

export function* revokeUserAccess({ payload: { interventionId, accessId } }) {
  const requestURL = `v1/interventions/${interventionId}/accesses/${accessId}`;
  try {
    yield call(axios.delete, requestURL);
    yield put(revokeUserAccessSuccess(accessId));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.revokeAccessError), {
      toastId: REVOKE_USER_ACCESS_ERROR,
    });
    yield put(revokeUserAccessFailure(accessId, error));
  }
}

export default function* revokeUserAccessSaga() {
  yield takeLatest(REVOKE_USER_ACCESS_REQUEST, revokeUserAccess);
}
