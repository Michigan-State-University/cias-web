import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  ENABLE_USER_ACCESS_REQUEST,
  ENABLE_USER_ACCESS_ERROR,
} from '../constants';
import { enableUserAccessSuccess, enableUserAccessFailure } from '../actions';
import messages from '../messages';

export function* enableUserAccess({ payload: { id, emails } }) {
  const requestURL = `v1/interventions/${id}/accesses`;
  try {
    const { data } = yield call(axios.post, requestURL, {
      user_session: {
        emails,
      },
    });
    const users = jsonApiToArray(data, 'interventionAccess');
    yield put(enableUserAccessSuccess(users));
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
