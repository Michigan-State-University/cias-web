import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { success as showSuccess } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';
import { addUserToList } from 'global/reducers/userList';

import messages from '../messages';
import {
  INVITE_RESEARCHER_REQUEST,
  INVITE_RESEARCHER_SUCCESS,
} from '../constants';
import { inviteResearcherSuccess, inviteResearcherError } from '../actions';
import { mapInvitedResearcher } from '../utils';

export function* inviteResearcher({ payload: { email } }) {
  const requestUrl = '/v1/users/invitations';
  const body = { invitation: { email } };
  try {
    const { data } = yield call(axios.post, requestUrl, body);
    const mappedUser = mapInvitedResearcher(data);

    yield put(inviteResearcherSuccess(mappedUser));
    yield put(addUserToList(mappedUser));
    yield put(
      showSuccess(formatMessage(messages.invitationSent), {
        id: INVITE_RESEARCHER_SUCCESS,
      }),
    );
  } catch (error) {
    yield put(inviteResearcherError(error.toString()));
  }
}

export default function* inviteResearcherSaga() {
  yield takeLatest(INVITE_RESEARCHER_REQUEST, inviteResearcher);
}
