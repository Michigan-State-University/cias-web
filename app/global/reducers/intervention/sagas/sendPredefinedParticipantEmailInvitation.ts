import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';
import { formatMessage } from 'utils/intlOutsideReact';
import objectToCamelCase from 'utils/objectToCamelCase';

import {
  sendPredefinedParticipantEmailInvitationError,
  sendPredefinedParticipantEmailInvitationRequest,
  sendPredefinedParticipantEmailInvitationSuccess,
} from '../actions';
import {
  SEND_PREDEFINED_PARTICIPANT_EMAIL_INVITATION_ERROR,
  SEND_PREDEFINED_PARTICIPANT_EMAIL_INVITATION_REQUEST,
  SEND_PREDEFINED_PARTICIPANT_EMAIL_INVITATION_SUCCESS,
} from '../constants';
import messages from '../messages';

function* sendPredefinedParticipantEmailInvitation({
  payload: { interventionId, participantId },
}: ReturnType<typeof sendPredefinedParticipantEmailInvitationRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/${participantId}/send_email_invitation`;

  try {
    const { data } = yield call(axios.post, requestURL);
    const { emailInvitationSentAt } = objectToCamelCase(data);

    if (!emailInvitationSentAt) {
      throw new Error();
    }

    yield put(
      sendPredefinedParticipantEmailInvitationSuccess(
        participantId,
        emailInvitationSentAt,
      ),
    );
    yield call(
      toast.success,
      formatMessage(messages.sendPredefinedParticipantEmailInvitationSuccess),
      {
        toastId: SEND_PREDEFINED_PARTICIPANT_EMAIL_INVITATION_SUCCESS,
      },
    );
  } catch (error) {
    yield put(sendPredefinedParticipantEmailInvitationError());
    yield call(
      toast.error,
      formatApiErrorMessage(
        error,
        messages.sendPredefinedParticipantEmailInvitationError,
      ),
      {
        toastId: SEND_PREDEFINED_PARTICIPANT_EMAIL_INVITATION_ERROR,
      },
    );
  }
}

export default function* sendPredefinedParticipantEmailInvitationSaga() {
  yield takeEvery(
    SEND_PREDEFINED_PARTICIPANT_EMAIL_INVITATION_REQUEST,
    sendPredefinedParticipantEmailInvitation,
  );
}
