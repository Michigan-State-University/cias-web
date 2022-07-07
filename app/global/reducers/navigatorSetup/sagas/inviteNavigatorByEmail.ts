// import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';
// import { toast } from 'react-toastify';

// import { ApiError } from 'models/Api';

// import { formatMessage } from 'utils/intlOutsideReact';

import { INVITE_NAVIGATOR_BY_EMAIL_REQUEST } from '../constants';
import {
  inviteNavigatorsByEmailSuccess,
  // inviteNavigatorByEmailError,
  inviteNavigatorsByEmailRequest,
} from '../actions';
// import messages from '../messages';

export function* inviteNavigatorByEmail({
  payload: { emails },
}: ReturnType<typeof inviteNavigatorsByEmailRequest>) {
  // const url = `/v1/live_chat/intervention/${interventionId}/navigator_setups/participant_links/${linkId}`;
  try {
    // yield call(axios.delete, url);
    yield put(
      inviteNavigatorsByEmailSuccess(
        emails.map((email) => ({ email, id: Math.random() })),
      ),
    );

    console.log(emails);
  } catch (error) {
    // yield call(toast.error, formatMessage(messages.updateError), {
    //   toastId: REMOVE_PARTICIPANT_LINK_ERROR,
    // });
    // yield put(inviteNavigatorByEmailError(error as ApiError));
  }
}

export default function* inviteNavigatorByEmailSaga() {
  yield takeLatest(INVITE_NAVIGATOR_BY_EMAIL_REQUEST, inviteNavigatorByEmail);
}
