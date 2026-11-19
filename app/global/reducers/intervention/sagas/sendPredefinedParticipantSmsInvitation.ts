import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import type { MessageDescriptor } from 'react-intl';

import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';
import { formatMessage } from 'utils/intlOutsideReact';
import objectToCamelCase from 'utils/objectToCamelCase';
import {
  getApiErrorCodes,
  getApiErrorStatus,
  getApiRetryAfter,
  isNotPublishedApiError,
} from 'utils/apiErrorCodes';

import {
  sendPredefinedParticipantSmsInvitationError,
  sendPredefinedParticipantSmsInvitationRequest,
  sendPredefinedParticipantSmsInvitationSuccess,
} from '../actions';
import {
  SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_ERROR,
  SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_REQUEST,
  SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_SUCCESS,
} from '../constants';
import messages from '../messages';

const ERROR_CODE_MESSAGES: Record<string, MessageDescriptor> = {
  SMS_OPTED_OUT: messages.sendPredefinedParticipantSmsInvitationOptedOut,
  SMS_NOT_ELIGIBLE: messages.sendPredefinedParticipantSmsInvitationNotEligible,
  SMS_SEND_FAILED: messages.sendPredefinedParticipantSmsInvitationSendFailed,
};

const getSmsInvitationErrorMessage = (error: any): string => {
  // Deliberately NOT `getApiErrorCodesForDisplay`: this endpoint reports the
  // editor lock by status, so a 403 outranks any code in the body — the
  // opposite of the precedence the campaign endpoints need.
  if (getApiErrorStatus(error) === 403) {
    return formatMessage(
      messages.sendPredefinedParticipantSmsInvitationNotCurrentEditor,
    );
  }

  if (isNotPublishedApiError(error)) {
    return formatMessage(
      messages.sendPredefinedParticipantSmsInvitationNotPublished,
    );
  }

  const codes = getApiErrorCodes(error);

  if (codes.includes('RESEND_TOO_SOON')) {
    const retryAfter = getApiRetryAfter(error);
    return formatMessage(
      messages.sendPredefinedParticipantSmsInvitationResendTooSoon,
      { minutes: retryAfter ? Math.ceil(retryAfter / 60) : 60 },
    );
  }

  const descriptor = codes
    .map((code) => ERROR_CODE_MESSAGES[code])
    .find(Boolean);

  if (descriptor) return formatMessage(descriptor);

  return formatApiErrorMessage(
    error,
    messages.sendPredefinedParticipantSmsInvitationError,
  );
};

export function* sendPredefinedParticipantSmsInvitation({
  payload: { interventionId, participantId },
}: ReturnType<typeof sendPredefinedParticipantSmsInvitationRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/${participantId}/send_sms_invitation`;

  try {
    const { data } = yield call(axios.post, requestURL);
    const { smsInvitationSentAt } = objectToCamelCase(data);

    if (!smsInvitationSentAt) {
      throw new Error();
    }

    yield put(
      sendPredefinedParticipantSmsInvitationSuccess(
        participantId,
        smsInvitationSentAt,
      ),
    );
    yield call(
      toast.success,
      formatMessage(messages.sendPredefinedParticipantSmsInvitationSuccess),
      {
        toastId: SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_SUCCESS,
      },
    );
  } catch (error) {
    yield put(sendPredefinedParticipantSmsInvitationError());
    yield call(toast.error, getSmsInvitationErrorMessage(error), {
      toastId: SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_ERROR,
    });
  }
}

export default function* sendPredefinedParticipantSmsInvitationSaga() {
  yield takeEvery(
    SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_REQUEST,
    sendPredefinedParticipantSmsInvitation,
  );
}
