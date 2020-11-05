import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';
import { mapAccessToStateObject } from 'utils/mapResponseObjects';
import {
  ENABLE_USER_ACCESS_REQUEST,
  ENABLE_USER_ACCESS_ERROR,
} from '../constants';
import { enableUserAccessSuccess, enableUserAccessFailure } from '../actions';
import messages from '../messages';

export function* enableUserAccess({ payload: { id, emails } }) {
  const requestURL = `v1/problems/${id}/users`;
  try {
    const {
      data: { user_interventions: users },
    } = yield call(axios.post, requestURL, {
      user_intervention: {
        emails,
      },
    });
    yield put(enableUserAccessSuccess(users.map(mapAccessToStateObject)));
  } catch (error) {
    yield put(
      showError(formatMessage(messages.giveUserAccessError), {
        id: ENABLE_USER_ACCESS_ERROR,
      }),
    );
    yield put(enableUserAccessFailure(error));
  }
}

export default function* enableUserAccessSaga() {
  yield takeLatest(ENABLE_USER_ACCESS_REQUEST, enableUserAccess);
}
