import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { mapAccessToStateObject } from 'utils/mapResponseObjects';
import {
  ENABLE_USER_ACCESS_REQUEST,
  ENABLE_USER_ACCESS_ERROR,
} from '../constants';
import { enableUserAccessSuccess, enableUserAccessFailure } from '../actions';
import messages from '../messages';

export function* enableUserAccess({ payload: { id, emails } }) {
  const requestURL = `v1/interventions/${id}/invitations`;
  try {
    const {
      data: { user_sessions: users },
    } = yield call(axios.post, requestURL, {
      user_session: {
        emails,
      },
    });
    yield put(enableUserAccessSuccess(users.map(mapAccessToStateObject)));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.giveUserAccessError), {
      toastId: ENABLE_USER_ACCESS_ERROR,
    });
    yield put(enableUserAccessFailure(error));
  }
}

export default function* enableUserAccessSaga() {
  yield takeLatest(ENABLE_USER_ACCESS_REQUEST, enableUserAccess);
}
