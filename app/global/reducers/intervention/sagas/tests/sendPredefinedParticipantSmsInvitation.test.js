import axios from 'axios';
import { toast } from 'react-toastify';
import { takeEvery } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import sendPredefinedParticipantSmsInvitationSaga, {
  sendPredefinedParticipantSmsInvitation,
} from 'global/reducers/intervention/sagas/sendPredefinedParticipantSmsInvitation';
import {
  sendPredefinedParticipantSmsInvitationError,
  sendPredefinedParticipantSmsInvitationSuccess,
} from '../../actions';
import {
  SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_ERROR,
  SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_REQUEST,
  SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_SUCCESS,
} from '../../constants';
import messages from '../../messages';

describe('sendPredefinedParticipantSmsInvitation saga', () => {
  const interventionId = 'int-1';
  const participantId = 'pp-1';
  const payload = { interventionId, participantId };

  /** A 4xx the way axios surfaces it. */
  const apiError = (status, data, headers = {}) => ({
    response: { status, data, headers },
  });

  const codeError = (status, code, details = {}) =>
    apiError(status, { details: { errors: [{ code }], ...details } });

  const expectErrorToast = (error, expectedMessage) =>
    expectSaga(sendPredefinedParticipantSmsInvitation, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .put(sendPredefinedParticipantSmsInvitationError())
      .call(toast.error, expectedMessage, {
        toastId: SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_ERROR,
      })
      .run();

  it('dispatches success with the camel-cased send date and shows a toast', () =>
    expectSaga(sendPredefinedParticipantSmsInvitation, { payload })
      .provide([
        [
          matchers.call.fn(axios.post),
          { data: { sms_invitation_sent_at: '2026-11-03T10:15:00.000Z' } },
        ],
      ])
      .put(
        sendPredefinedParticipantSmsInvitationSuccess(
          participantId,
          '2026-11-03T10:15:00.000Z',
        ),
      )
      .call(
        toast.success,
        formatMessage(messages.sendPredefinedParticipantSmsInvitationSuccess),
        { toastId: SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_SUCCESS },
      )
      .run());

  it('posts to the participant-scoped send_sms_invitation path', () => {
    const urls = [];

    return expectSaga(sendPredefinedParticipantSmsInvitation, { payload })
      .provide({
        call({ fn, args }, next) {
          if (fn === axios.post) {
            urls.push(args[0]);
            return {
              data: { sms_invitation_sent_at: '2026-11-03T10:15:00.000Z' },
            };
          }
          return next();
        },
      })
      .run()
      .then(() => {
        expect(urls).toEqual([
          `v1/interventions/${interventionId}/predefined_participants/${participantId}/send_sms_invitation`,
        ]);
      });
  });

  it('treats a 2xx without sms_invitation_sent_at as an error', () =>
    expectSaga(sendPredefinedParticipantSmsInvitation, { payload })
      .provide([[matchers.call.fn(axios.post), { data: {} }]])
      .not.put(
        sendPredefinedParticipantSmsInvitationSuccess(participantId, undefined),
      )
      .put(sendPredefinedParticipantSmsInvitationError())
      .call.fn(toast.error)
      .run());

  it('turns details.retry_after into whole minutes on RESEND_TOO_SOON', () =>
    expectErrorToast(
      codeError(429, 'RESEND_TOO_SOON', { retry_after: 1800 }),
      formatMessage(
        messages.sendPredefinedParticipantSmsInvitationResendTooSoon,
        { minutes: 30 },
      ),
    ));

  it('rounds a sub-minute Retry-After header up to a full minute', () =>
    expectErrorToast(
      apiError(
        429,
        { details: { errors: [{ code: 'RESEND_TOO_SOON' }] } },
        { 'retry-after': '90' },
      ),
      formatMessage(
        messages.sendPredefinedParticipantSmsInvitationResendTooSoon,
        { minutes: 2 },
      ),
    ));

  it('falls back to 60 minutes when the cooldown length is not given', () =>
    expectErrorToast(
      codeError(429, 'RESEND_TOO_SOON'),
      formatMessage(
        messages.sendPredefinedParticipantSmsInvitationResendTooSoon,
        { minutes: 60 },
      ),
    ));

  it('explains an opted-out participant', () =>
    expectErrorToast(
      codeError(422, 'SMS_OPTED_OUT'),
      formatMessage(messages.sendPredefinedParticipantSmsInvitationOptedOut),
    ));

  it('explains a participant who cannot receive SMS', () =>
    expectErrorToast(
      codeError(422, 'SMS_NOT_ELIGIBLE'),
      formatMessage(messages.sendPredefinedParticipantSmsInvitationNotEligible),
    ));

  it('explains a failed send', () =>
    expectErrorToast(
      codeError(422, 'SMS_SEND_FAILED'),
      formatMessage(messages.sendPredefinedParticipantSmsInvitationSendFailed),
    ));

  it('reports a 403 as "not the current editor", even with a code in the body', () =>
    expectErrorToast(
      codeError(403, 'SMS_SEND_FAILED'),
      formatMessage(
        messages.sendPredefinedParticipantSmsInvitationNotCurrentEditor,
      ),
    ));

  it('reports a 400 carrying details.reason as "not published"', () =>
    expectErrorToast(
      apiError(400, { details: { reason: 'intervention_not_published' } }),
      formatMessage(
        messages.sendPredefinedParticipantSmsInvitationNotPublished,
      ),
    ));

  it('does not claim "not published" for a 400 without a reason', () => {
    const error = codeError(400, 'SMS_SEND_FAILED');

    return expectErrorToast(
      error,
      formatMessage(messages.sendPredefinedParticipantSmsInvitationSendFailed),
    );
  });

  it('falls back to formatApiErrorMessage on an unrecognised error', () => {
    const networkError = new Error('Network Error');

    return expectErrorToast(
      networkError,
      formatApiErrorMessage(
        networkError,
        messages.sendPredefinedParticipantSmsInvitationError,
      ),
    );
  });

  it('watcher uses takeEvery so several rows can be sent at once', () => {
    const sagaFunction = sendPredefinedParticipantSmsInvitationSaga();
    expect(sagaFunction.next().value).toEqual(
      takeEvery(
        SEND_PREDEFINED_PARTICIPANT_SMS_INVITATION_REQUEST,
        sendPredefinedParticipantSmsInvitation,
      ),
    );
  });
});
