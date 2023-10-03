import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';
import { formatMessage } from 'utils/intlOutsideReact';
import objectToCamelCase from 'utils/objectToCamelCase';

import {
  sendPredefinedParticipantSmsInvitationError,
  sendPredefinedParticipantSmsInvitationRequest,
  sendPredefinedParticipantSmsInvitationSuccess,
} from '../actions';
import {
  SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_ERROR,
  SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_REQUEST,
} from '../constants';
import messages from '../messages';

function* sendPredefinedParticipantSmsInvitation({
  payload: { interventionId, participantId },
}: ReturnType<typeof sendPredefinedParticipantSmsInvitationRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/${participantId}/send_invitation`;

  try {
    const { data } = yield call(axios.post, requestURL);
    const { invitationSentAt } = objectToCamelCase(data);

    if (!invitationSentAt) {
      throw new Error();
    }

    yield put(
      sendPredefinedParticipantSmsInvitationSuccess(
        participantId,
        invitationSentAt,
      ),
    );
    yield call(
      toast.success,
      formatMessage(messages.sendPredefinedParticipantSmsInvitationSuccess),
      {
        toastId: SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_ERROR,
      },
    );
  } catch (error) {
    yield put(sendPredefinedParticipantSmsInvitationError());
    yield call(
      toast.error,
      formatApiErrorMessage(
        error,
        messages.sendPredefinedParticipantSmsInvitationError,
      ),
      {
        toastId: SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_ERROR,
      },
    );
  }
}

export default function* sendPredefinedParticipantSmsInvitationSaga() {
  yield takeEvery(
    SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_REQUEST,
    sendPredefinedParticipantSmsInvitation,
  );
}
