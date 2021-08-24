import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { requestErrorMessageHandler } from 'utils/errors/requestErrorMessageHandler';
import { addUserToList } from 'global/reducers/userList';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import messages from '../messages';
import {
  INVITE_RESEARCHER_REQUEST,
  INVITE_RESEARCHER_SUCCESS,
} from '../constants';
import { inviteResearcherSuccess, inviteResearcherError } from '../actions';

export function* inviteResearcher({ payload: { email } }) {
  const requestUrl = '/v1/users/invitations';
  const body = { invitation: { email } };
  try {
    const { data } = yield call(axios.post, requestUrl, body);
    const user = jsonApiToObject(data, 'user');

    yield put(inviteResearcherSuccess(user));
    yield put(addUserToList(user));
    yield call(toast.success, formatMessage(messages.invitationSent), {
      toastId: INVITE_RESEARCHER_SUCCESS,
    });
  } catch (error) {
    yield put(inviteResearcherError(requestErrorMessageHandler(error)));
  }
}

export default function* inviteResearcherSaga() {
  yield takeLatest(INVITE_RESEARCHER_REQUEST, inviteResearcher);
}
